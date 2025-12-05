import express from "express"
import { usersControllers } from "./users.controller"
const router=express.Router()

router.post("/",usersControllers.createUsers)
router.get("/",usersControllers.getAllUsers)
router.put("/:userId",usersControllers.updateUsers)
router.delete("/:userId",usersControllers.deleteUser)

export const usersRoutes=router