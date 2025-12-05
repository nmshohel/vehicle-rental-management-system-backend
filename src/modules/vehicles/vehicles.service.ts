import { pool } from "../../config/db"

const createVehicles=async(payload:Record<string,unknown>)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload
    const result=await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) 
        VALUES($1,$2,$3,$4,$5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    return result;
}
const updateVehicles=async(payload:Record<string,unknown>,vehicleId:string)=>{
    const {vehicle_name}=payload
    const result=await pool.query(`UPDATE vehicles SET vehicle_name=$1 WHERE id=$2 RETURNING *`,[
        vehicle_name,vehicleId]);
    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    return result;
}
const getAllVehicles=async()=>{
    const result=await pool.query(`SELECT * FROM vehicles`)


    result.rows.forEach((res)=>{
    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    })
    return result;
}
const deleteVehicle=async(id:string)=>{
       const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
       return result
}
const getVehicleById=async(id:string)=>{
       const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
        delete result.rows[0].created_at
        delete result.rows[0].updated_at
       return result
}
export const vehiclesServices={
    createVehicles,updateVehicles,getAllVehicles,deleteVehicle,getVehicleById
}

