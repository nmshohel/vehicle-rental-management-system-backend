import express from "express"
import { vehiclesControllers } from "./vehicles.controller"
const router=express.Router()

router.post("/",vehiclesControllers.createVehicles)
router.get("/",vehiclesControllers.getAllVehicles)
router.get("/:vehicleId",vehiclesControllers.getAllVehicleById)
router.put("/:vehicleId",vehiclesControllers.updateVehicles)
router.delete("/:vehicleId",vehiclesControllers.deleteVehicle)


export const vehiclesRoutes=router