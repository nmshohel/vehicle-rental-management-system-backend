import { pool } from "../../config/db"

const createBookings=async(payload:Record<string,unknown>)=>{
    const {customer_id,vehicle_id,rent_start_date,rent_end_date}=payload
 
    const start = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);
    const noOfDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const vehicleInfo=await pool.query(`SELECT daily_rent_price FROM vehicles WHERE id=$1`,[vehicle_id])
    const dailyRentPrice:number=vehicleInfo.rows[0].daily_rent_price
    let total_price:number=0
    if(noOfDays===0)
    {
         total_price=dailyRentPrice as number
    }
    else
    {
        total_price=((noOfDays+1)*dailyRentPrice) as number
    }
    const status="active"
    // console.log(rent_start_date)
    const result=await pool.query(`INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) 
        VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status])
        delete result.rows[0].created_at
        delete result.rows[0].updated_at
        result.rows[0].total_price=parseInt(result.rows[0].total_price.toString())
        result.rows[0].rent_start_date = result.rows[0].rent_start_date.toISOString().split("T")[0];
        result.rows[0].rent_end_date = result.rows[0].rent_end_date.toISOString().split("T")[0];
    
    if(result.rows.length>0)
    {
        const vehicleStatus="booked"
        const vehicleStatusUpdate=await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,[vehicleStatus,vehicle_id]);
    }

    return result;
}
const updateBookings=async(payload:Record<string,unknown>,bookingId:string,user:any)=>{
    
    const {status}=payload
    // console.log("service--------------------",status,user.role)

    const result=await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[
        status,bookingId]);
        delete result.rows[0].created_at
        delete result.rows[0].updated_at
        result.rows[0].total_price=parseInt(result.rows[0].total_price.toString())
        result.rows[0].rent_start_date = result.rows[0].rent_start_date.toISOString().split("T")[0];
        result.rows[0].rent_end_date = result.rows[0].rent_end_date.toISOString().split("T")[0];
    const vehicleId=result.rows[0].vehicle_id
    console.log(vehicleId)
    if(result.rows[0].status==="returned" || result.rows[0].status==="cancelled"){
        const vehicleStatus="available"
        const vehicleStatusUpdate=await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,[vehicleStatus,vehicleId]);
    }
    
    return result;
}
const getBookings=async(user:any)=>{
    // console.log("service--------------",user)
    const role=user.role
    const email=user.email
    


    if(role==="customer")
    {
        const customerInfo=await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const id=customerInfo.rows[0].id
        const result=await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`,[id])

            result.rows.forEach((res)=>{
            delete res.created_at;
            delete res.updated_at;
            delete res.password;
            delete res.customer_id;
            res.rent_start_date=res.rent_start_date.toISOString().split("T")[0];
            res.rent_end_date=res.rent_end_date.toISOString().split("T")[0];
            res.total_price=parseInt(res.total_price.toString())

            })
        
        return result;
    }
    else{
        const result=await pool.query(`SELECT * FROM bookings`)

            result.rows.forEach((res)=>{
            delete res.created_at;
            delete res.updated_at;
            delete res.password;
            res.rent_start_date=res.rent_start_date.toISOString().split("T")[0];
            res.rent_end_date=res.rent_end_date.toISOString().split("T")[0];
            res.total_price=parseInt(res.total_price.toString());
  
            })
        ///System automatically marks bookings as "returned" when rent_end_date has passed
        result.rows.forEach(async(res)=>{
            const rentDate=new Date(res.rent_end_date)
            const currentDate=new Date()
            if(rentDate<currentDate)
            {

                const bookingId=res.id
                const status="returned"
                ///set booking status returned
                const bookingInfo=await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[
                                    status,bookingId]);}

                const vehicleId=res.vehicle_id
                const vehicleStatus="available"
                //set vehicle status available
                const vehicleStatusUpdate=await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,[vehicleStatus,vehicleId]);

        })


        return result;


    }
   
}

export const bookingsServices={
   createBookings,updateBookings,getBookings
}

