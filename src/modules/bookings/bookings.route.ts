import express from "express"
import { bookingsControllers } from "./bookings.controller"
import auth from "../../middleware/auth"
const router=express.Router()

router.post("/",auth("customer","admin"),bookingsControllers.createBookings)
router.get("/",auth("customer","admin"),bookingsControllers.getBookings)
router.put("/:bookingId",auth("customer","admin"),bookingsControllers.updateBookings)



export const bookingsRoutes=router