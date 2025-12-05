import { Request, Response } from "express";
import { Result } from "pg";
import { usersServices } from "./users.service";

const updateUsers=async(req:Request,res:Response)=>{
    try{
        const result=await usersServices.updateUsers(req.body,req.params.userId as string)
      
        res.status(200).json({
            sucess:true,
            message:"User updated successfully",
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
const getAllUsers=async(req:Request,res:Response)=>{
    try{
        const result=await usersServices.getAllUsers()
        res.status(200).json({
            sucess:true,
            message:"Users retrieved successfully",
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
const deleteUser=async(req:Request,res:Response)=>{

    try{
        const result=await usersServices.deleteUser(req.params.userId as string)
        res.status(200).json({
            sucess:true,
            message:"User deleted successfully",
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
export const usersControllers={
    updateUsers,getAllUsers,deleteUser
}