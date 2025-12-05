import express, { NextFunction, Request, Response } from 'express'
import initDB from './config/db'
import { usersRoutes } from './modules/users/users.route'
const app = express()
initDB()
app.use(express.json())
app.get('/',(req:Request, res:Response) => {
  res.send('Server is running...............')
})

app.use("/api/v1/users",usersRoutes)
app.use((req:Request,res:Response)=>{
  res.status(404).json({
    success:false,
    message:"Route Not Found",
    path:req.path
  })
})
export default app