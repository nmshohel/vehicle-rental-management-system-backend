import { pool } from "../../config/db"

const createBookings=async(payload:Record<string,unknown>)=>{
    const {customer_id,vehicle_id,rent_start_date,rent_end_date}=payload
    const total_price=100
    const status="active"

    const result=await pool.query(`INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) 
        VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status])
    return result;
}
const updateBookings=async(payload:Record<string,unknown>,bookingId:string)=>{
    const {status}=payload
    const result=await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[
        status,bookingId]);
    return result;
}
const getBookings=async()=>{
    const result=await pool.query(`SELECT * FROM bookings`)
    return result;
}

export const bookingsServices={
   createBookings,updateBookings,getBookings
}

