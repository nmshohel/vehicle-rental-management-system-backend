import express from "express"
import { vehiclesControllers } from "./vehicles.controller"
import auth from "../../middleware/auth"
const router=express.Router()

router.post("/",auth("admin"),vehiclesControllers.createVehicles)
router.get("/",vehiclesControllers.getAllVehicles)
router.get("/:vehicleId",vehiclesControllers.getAllVehicleById)
router.put("/:vehicleId",vehiclesControllers.updateVehicles)
router.delete("/:vehicleId",vehiclesControllers.deleteVehicle)


export const vehiclesRoutes=router