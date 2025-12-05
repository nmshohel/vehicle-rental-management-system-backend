import express from "express"
import { usersControllers } from "./users.controller"
const router=express.Router()

router.post("/",usersControllers.createUsers)
router.put("/:id",usersControllers.updateUsers)

export const usersRoutes=router