import { pool } from "../../config/db"

const createVehicles=async(payload:any)=>{
        type VehiclePayload = {
        vehicle_name: string;
        type: "car" | "bike" | "van" | "SUV";
        registration_number: string;
        daily_rent_price: number;
        availability_status: "available" | "booked";
        };
     const {vehicle_name,type,registration_number,daily_rent_price,availability_status}:VehiclePayload=payload
    if(vehicle_name?.length===0 || vehicle_name===undefined)
    {
        throw new Error("Vehicle Name is required")
    }
    if(type?.length===0 || type===undefined)
    {
        throw new Error("Type is required")
    }
    if(type!=="car" && type !=="bike" && type !=="van" && type !=="SUV")
    {
        throw new Error("Type is only Car/Bike/Van,SUV")
    }
    if(registration_number?.length===0 || registration_number===undefined)
    {
        throw new Error("Resgistration No is required")
    }
    if(daily_rent_price===null || daily_rent_price===undefined)
    {
        throw new Error("Rent Price is required")
    }
    if(daily_rent_price <1 )
    {
        throw new Error("Rent Price is Must be Positive")
    }
    if(availability_status?.length===0 || availability_status===undefined)
    {
        throw new Error("Availability Status is required")
    }
    if(availability_status!=="available" && availability_status !=="booked")
    {
        throw new Error("Availability Status is only Available or Booked")
    }
    const vehileIfo=await pool.query(`SELECT * FROM vehicles WHERE registration_number=$1`,[registration_number])
    if(vehileIfo.rows.length !==0){
        throw new Error("Vehicle is already exist")
    }

    const result=await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) 
        VALUES($1,$2,$3,$4,$5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    result.rows[0].daily_rent_price=parseInt(result.rows[0].daily_rent_price.toString())
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
    delete res?.rows[0]?.created_at
    delete res?.rows[0]?.updated_at
    })
    return result;
}
const deleteVehicle=async(id:string)=>{

        // Vehicles cannot be deleted if they have active bookings
        // const bookingInfo=await pool.query(`SELECT * FROM bookings WHERE vehicle_id=$1`,[id])
        // console.log(bookingInfo.rows[0])
       const vehiclesInfo = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
       

         if(vehiclesInfo?.rows[0]?.availability_status==="available")
         {
            const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
            return result
         }
         else{
            throw new Error("Vehicle is booked.You cannot be deleted")
         }



    //    return result
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

