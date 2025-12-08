import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";


const createVehicles=async(req:Request,res:Response)=>{
try{
    const result=await vehiclesServices.createVehicles(req.body)
    res.status(201).json({
        sucess:true,
        message:"Vehicle created successfully",
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
const updateVehicles=async(req:Request,res:Response)=>{
    const vehicleId=req.params.vehicleId
    try{
        const result=await vehiclesServices.updateVehicles(req.body,vehicleId as string)
        res.status(200).json({
            sucess:true,
            message:"Vehicle updated successfully",
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
const getAllVehicles=async(req:Request,res:Response)=>{
    try{
        const result=await vehiclesServices.getAllVehicles()
     

        if(result?.rows?.length===0)
        {
            res.status(200).json({
            sucess:true,
            message:"No vehicles found",
            data:[]
            })

        }
        res.status(200).json({
            sucess:true,
            message:"Vehicles retrieved successfully",
            data:result?.rows
        })

    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}
const getAllVehicleById=async(req:Request,res:Response)=>{
    const vehicleId=req.params.vehicleId
    try{
        const result=await vehiclesServices.getVehicleById(vehicleId as string)
        res.status(200).json({
            sucess:true,
            message:"Vehicle retrieved successfully",
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
const deleteVehicle=async(req:Request,res:Response)=>{

    try{
        const result=await vehiclesServices.deleteVehicle(req.params.vehicleId as string)
        res.status(200).json({
            sucess:true,
            message:"Vehicle deleted successfully",
            data:result?.rows[0]
        })

    }
    catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}
export const vehiclesControllers={
    createVehicles,updateVehicles,getAllVehicles,deleteVehicle,getAllVehicleById
}