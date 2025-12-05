import config from "../../config";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import responseModifier from "../../helpers";


const createUsers=async(payload:Record<string,unknown>)=>{
    const {name,email,password,phone,role}=payload
    const hashPassword=await bcrypt.hash(password as string,10)
    const result=await pool.query(`INSERT INTO users(name,email,password,phone,role) 
        VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,phone,role`,[name,email,hashPassword,phone,role])
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

