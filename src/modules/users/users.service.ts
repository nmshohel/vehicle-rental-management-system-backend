import { pool } from "../../config/db"

const createUsers=async(payload:Record<string,unknown>)=>{
    const {name,email,password,phone,role}=payload
    const result=await pool.query(`INSERT INTO users(name,email,password,phone,role) 
        VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,email,password,phone,role])
    return result;
}
const updateUsers=async(payload:Record<string,unknown>)=>{
    const {name,email,password,phone,role,id}=payload
    const result=await pool.query(`UPDATE users SET name=$1, email=$2, password=$3,phone=$4,role=$5 WHERE id=$6 RETURNING *`,[
        name,email,password,phone,role,id
    ]);
    return result;
}
export const usersServices={
    createUsers,updateUsers
}

