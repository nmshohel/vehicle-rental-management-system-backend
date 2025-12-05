import express from "express"
import { bookingsControllers } from "./bookings.controller"
const router=express.Router()

router.post("/",bookingsControllers.createBookings)
router.get("/",bookingsControllers.getBookings)
router.put("/:bookingId",bookingsControllers.updateBookings)



export const bookingsRoutes=router