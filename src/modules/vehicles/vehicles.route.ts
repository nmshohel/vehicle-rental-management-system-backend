import express from "express"
import { vehiclesControllers } from "./vehicles.controller"
import auth from "../../middleware/auth"
const router=express.Router()

router.post("/",auth("admin"),vehiclesControllers.createVehicles)
router.get("/",vehiclesControllers.getAllVehicles)
router.get("/:vehicleId",vehiclesControllers.getAllVehicleById)
router.put("/:vehicleId",auth("admin"),vehiclesControllers.updateVehicles)
router.delete("/:vehicleId",auth("admin"),vehiclesControllers.deleteVehicle)


export const vehiclesRoutes=router