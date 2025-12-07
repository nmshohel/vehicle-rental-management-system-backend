import { pool } from "../../config/db"


const updateUsers=async(payload:Record<string,unknown>,userId:string,user:any)=>{
    const {name,email,password,phone,role,id}=payload

    // console.log(user?.email)
    const userInfo=await pool.query(`SELECT * FROM users WHERE email=$1`,[user.email])
    console.log(user?.role==="customer")
  
    if(user?.role==="customer")
    {
        
        if(userInfo?.rows[0]?.id !=userId)
        {
            throw new Error("You can update only own profile")
        }
    }
    const result=await pool.query(`UPDATE users SET name=$1 WHERE id=$2 RETURNING *`,[
        name,userId]);
    delete result?.rows[0]?.created_at
    delete result?.rows[0]?.updated_at
    delete result?.rows[0]?.password
    return result;
}
const getAllUsers=async()=>{
    const result=await pool.query(`SELECT * FROM users`)
    result.rows.forEach((res)=>{
    delete res.created_at
    delete res.updated_at
    delete res.password
    })
    return result;
}
const deleteUser=async(id:string)=>{

        const bookingInfo=await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`,[id])

        if(!(bookingInfo?.rows[0]?.status==="active"))
        {
            const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
            return result
        }
        else{
            throw new Error("User have booking.You cannot be deleted")
        }
}
export const usersServices={
    updateUsers,getAllUsers,deleteUser
}

