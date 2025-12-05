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
export const usersControllers={
    createUsers,updateUsers
}