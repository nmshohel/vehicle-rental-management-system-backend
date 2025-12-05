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
        const result=await bookingsServices.updateBookings(req.body,bookingId as string)
        res.status(201).json({
            sucess:true,
            message:"Data Updated Successfully",
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
const getBookings=async(req:Request,res:Response)=>{
    try{
        const result=await bookingsServices.getBookings()
        res.status(200).json({
            sucess:true,
            message:"Bookings retrieved successfully",
            data:result.rows
        })

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