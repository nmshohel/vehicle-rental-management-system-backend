import express from "express"
import { usersControllers } from "./users.controller"
import auth from "../../middleware/auth"
const router=express.Router()


router.get("/",auth(),usersControllers.getAllUsers)
router.put("/:userId",usersControllers.updateUsers)
router.delete("/:userId",usersControllers.deleteUser)

export const usersRoutes=router