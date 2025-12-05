import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";


const createVehicles=async(req:Request,res:Response)=>{
try{
    const result=await vehiclesServices.createVehicles(req.body)
    res.status(201).json({
        sucess:true,
        message:"Data Created Successfully",
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
    try{
        const result=await vehiclesServices.updateVehicles(req.body)
        console.log(req.body)
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
const getAllVehicles=async(req:Request,res:Response)=>{
    try{
        const result=await vehiclesServices.getAllVehicles()
        res.status(201).json({
            sucess:true,
            message:"Data Fetch Successfully",
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
const getAllVehicleById=async(req:Request,res:Response)=>{
    const vehicleId=req.params.vehicleId
    try{
        const result=await vehiclesServices.getVehicleVehicleById(vehicleId as string)
        res.status(201).json({
            sucess:true,
            message:"Data Fetch Successfully",
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
        res.status(201).json({
            sucess:true,
            message:"Data Deleted Successfully",
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
export const vehiclesControllers={
    createVehicles,updateVehicles,getAllVehicles,deleteVehicle,getAllVehicleById
}