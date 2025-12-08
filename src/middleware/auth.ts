import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";

const auth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
           try{
            const token = req.headers.authorization?.split(" ")[1];
            if(!token)
            {
                res.status(401).json({
                    message:"Your are Unauthorized"
                })
            }
            const decoded=jwt.verify(token as string,config.jwtSecret as string) as JwtPayload
           
            req.user=decoded 

            if(roles.length && !roles.includes(decoded.role as string))
                {
                    return res.status(403).json({
                    error:"Forbidden"
                    })
                }

            next();

        }
        catch(err:any){

            res.status(500).json({
                success:false,
                message:err.message
            })
        }

    }

}

export default auth