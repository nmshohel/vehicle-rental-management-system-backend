import { pool } from "../../config/db"


const updateUsers=async(payload:Record<string,unknown>)=>{
    const {name,email,password,phone,role,id}=payload
    const result=await pool.query(`UPDATE users SET name=$1, email=$2, password=$3,phone=$4,role=$5 WHERE id=$6 RETURNING *`,[
        name,email,password,phone,role,id]);
    return result;
}
const getAllUsers=async()=>{
    const result=await pool.query(`SELECT * FROM users`)
    return result;
}
const deleteUser=async(id:string)=>{
       const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
       return result
}
export const usersServices={
    updateUsers,getAllUsers,deleteUser
}

