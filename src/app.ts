import express, { NextFunction, Request, Response } from 'express'
import initDB from './config/db'
import { usersRoutes } from './modules/users/users.route'
import { vehiclesRoutes } from './modules/vehicles/vehicles.route'
import { bookingsRoutes } from './modules/bookings/bookings.route'
import { authRoutes } from './modules/auth/auth.route'
const app = express()
initDB()
app.use(express.json())
app.get('/',(req:Request, res:Response) => {
  res.send('Server is running...............')
})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/users",usersRoutes)
app.use("/api/v1/vehicles",vehiclesRoutes)
app.use("/api/v1/bookings",bookingsRoutes)

app.use((req:Request,res:Response)=>{
  res.status(404).json({
    success:false,
    message:"Route Not Found",
    path:req.path
  })
})
export default app