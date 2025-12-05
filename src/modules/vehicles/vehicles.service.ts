import { pool } from "../../config/db"

const createVehicles=async(payload:Record<string,unknown>)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload
    const result=await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) 
        VALUES($1,$2,$3,$4,$5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
    return result;
}
const updateVehicles=async(payload:Record<string,unknown>)=>{
    const {vehicle_name,vehicleId}=payload
    const result=await pool.query(`UPDATE vehicles SET vehicle_name=$1 WHERE id=$2 RETURNING *`,[
        vehicle_name,vehicleId]);
    return result;
}
const getAllVehicles=async()=>{
    const result=await pool.query(`SELECT * FROM vehicles`)
    return result;
}
const deleteVehicle=async(id:string)=>{
       const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
       return result
}
const getVehicleVehicleById=async(id:string)=>{
       const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
       return result
}
export const vehiclesServices={
    createVehicles,updateVehicles,getAllVehicles,deleteVehicle,getVehicleVehicleById
}

