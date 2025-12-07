import config from "../../config";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import responseModifier from "../../helpers";
    type UserPayload = {
            name: string;
            email: string;
            password: string;
            phone: string;
            role: "admin" | "customer";
            };

const createUsers=async(payload:any)=>{

    const {name,email,password,phone,role}:UserPayload=payload
    
    if(name?.length===0 || name===undefined)
    {
        throw new Error("Name is required")
    }
    if(email?.length===0 || email===undefined)
    {
        throw new Error("Email is required")
    }
    if(password?.length===0 || password===undefined)
    {
        throw new Error("Password is required")
    }
    if(role?.length===0 || role===undefined)
    {
        throw new Error("Role is required")
    }
    if(role!=="admin" && role !=="customer")
    {
        throw new Error("Role is only Admin or Customer")
    }
    if(phone?.length===0 || phone===undefined)
    {
        throw new Error("Phone is required")
    }
    const hashPassword=await bcrypt.hash(password as string,10)
    const emailInLowercase=await (email as string).toLowerCase()
    //check user exinsting
    const userInfo=await pool.query(`SELECT * FROM users WHERE email=$1`,[emailInLowercase])
    if(userInfo.rows?.length !==0)
    {
        throw new Error("User already exist.")
    }
    const result=await pool.query(`INSERT INTO users(name,email,password,phone,role) 
        VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role`,[name,emailInLowercase,hashPassword,phone,role])
    return result;
}


const loginUser=async(email:string,password:string)=>{
    const result=await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
    const tempRes=responseModifier(result.rows[0])
    if(result.rows.length===0){
        return null
    }
    const user=result.rows[0]
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        return false;
    }
    const secret=config.jwtSecret
    const token=jwt.sign({name:user.name,email:user.email,role:user.role},secret as string,{expiresIn:"7d"})
    delete user.password
    delete user.created_at
    delete user.updated_at
    return {token,user}
}


export const authServices={
    createUsers,loginUser
}

