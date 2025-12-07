import { pool } from "../../config/db"

const createBookings=async(payload:any)=>{
            type BookingPayload = {
            customer_id: number;
            vehicle_id: number;
            rent_start_date: string;
            rent_end_date: string;
            };
    const {customer_id,vehicle_id,rent_start_date,rent_end_date}:BookingPayload=payload
        if(customer_id===null || customer_id===undefined)
        {
            throw new Error("Customer id is required")
        }
        if(vehicle_id===null || vehicle_id===undefined)
        {
            throw new Error("Vehicle id is required")
        }
        if(rent_start_date?.length===0 || rent_start_date===undefined)
        {
            throw new Error("Rent Start date is required")
        }
        if(rent_end_date?.length===0 || rent_end_date===undefined)
        {
            throw new Error("Rent End date is required")
        }
        // if(availability_status!=="available" && availability_status !=="booked")
        // {
        //     throw new Error("Availability Status is only Available or Booked")
        // }
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date as string);
    if(end<start)
    {
        throw new Error("Rent end date must be after start date")
    }

    const noOfDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const vehicleInfo=await pool.query(`SELECT * FROM vehicles WHERE id=$1`,[vehicle_id])
   
    const customerInfo=await pool.query(`SELECT * FROM users WHERE id=$1`,[customer_id])
    if(customerInfo?.rows?.length===0)
    {
        throw new Error("Customer is not found")
    }
    if(vehicleInfo?.rows?.length===0)
    {
        throw new Error("Vehicle is not found")
    }
    const dailyRentPrice:number=vehicleInfo?.rows[0]?.daily_rent_price

    const totalPrice=noOfDays*dailyRentPrice
    if(totalPrice<1)
    {
        throw new Error("Enter Valid Date ")
    }
    if(vehicleInfo?.rows[0]?.availability_status==="booked")
    {
        throw new Error("Vehicle is already booked")
    }
    const status="active"
    const result=await pool.query(`INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) 
        VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[customer_id,vehicle_id,rent_start_date,rent_end_date,totalPrice,status])
        delete result.rows[0].created_at
        delete result.rows[0].updated_at
        result.rows[0].total_price=parseInt(result.rows[0].total_price.toString())
        result.rows[0].rent_start_date = result.rows[0].rent_start_date.toISOString().split("T")[0];
        result.rows[0].rent_end_date = result.rows[0].rent_end_date.toISOString().split("T")[0];

    // change vehicle status to booked
    if(result.rows.length>0)
    {
        const vehicleStatus="booked"
        const vehicleStatusUpdate=await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,[vehicleStatus,vehicle_id]);
    }

    return result;
}
const updateBookings=async(payload:Record<string,unknown>,bookingId:string,user:any)=>{
    
    const {status}=payload
  

    const result=await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[
        status,bookingId]);
        delete result.rows[0].created_at
        delete result.rows[0].updated_at
        result.rows[0].total_price=parseInt(result.rows[0].total_price.toString())
        result.rows[0].rent_start_date = result.rows[0].rent_start_date.toISOString().split("T")[0];
        result.rows[0].rent_end_date = result.rows[0].rent_end_date.toISOString().split("T")[0];
    const vehicleId=result.rows[0].vehicle_id
    
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

