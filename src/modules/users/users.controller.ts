import { Request, Response } from "express";
import { Result } from "pg";
import { usersServices } from "./users.service";

const createUsers=async(req:Request,res:Response)=>{
try{
    const result=await usersServices.createUsers(req.body)
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
const updateUsers=async(req:Request,res:Response)=>{
    try{
        const result=await usersServices.updateUsers(req.body)
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
const getAllUsers=async(req:Request,res:Response)=>{
    try{
        const result=await usersServices.getAllUsers()
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
const deleteUser=async(req:Request,res:Response)=>{

    try{
        const result=await usersServices.deleteUser(req.params.userId as string)
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
export const usersControllers={
    createUsers,updateUsers,getAllUsers,deleteUser
}