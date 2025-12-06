import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const createBookings=async(req:Request,res:Response)=>{
try{
    const result=await bookingsServices.createBookings(req.body)
    res.status(201).json({
        sucess:true,
        message:"Booking created successfully",
        data:result.rows[0]
    })

}
catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message
    })

}
}
const updateBookings=async(req:Request,res:Response)=>{
    const bookingId=req.params.bookingId

    try{
        const result=await bookingsServices.updateBookings(req.body,bookingId as string,req.user)
        if(req?.user?.role==="customer")
        {
            res.status(200).json({
            sucess:true,
            message:"Booking cancelled successfully",
            data:result.rows[0]
        })

        }
        else{
            res.status(200).json({
            sucess:true,
            message:"Booking marked as returned. Vehicle is now available",
            data:result.rows[0]
        })

        }


    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}
const getBookings=async(req:Request,res:Response)=>{
    const user=req.user
    // console.log("controller----",user)
   
    try{
        const result=await bookingsServices.getBookings(user)
        console.log(user)
        if(user?.role==="admin")
        {
            res.status(200).json({
            sucess:true,
            message:"Bookings retrieved successfully",
            data:result.rows
        })

        }
        else{
            res.status(200).json({
            sucess:true,
            message:"Your bookings retrieved successfully",
            data:result.rows
        })

        }


    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

export const bookingsControllers={
    createBookings,updateBookings,getBookings
}