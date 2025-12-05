import { Request, Response } from "express";
import { authServices } from "./auth.service";



const createUsers=async(req:Request,res:Response)=>{
try{
    const result=await authServices.createUsers(req.body)
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



export const authControllers={
    createUsers,
}