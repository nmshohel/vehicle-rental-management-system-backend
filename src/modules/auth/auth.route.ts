import express from "express"
import { authControllers } from "./auth.controller"
import auth from "../../middleware/auth"
const router=express.Router()

router.post("/signup",authControllers.createUsers)
router.post("/signin",auth("user","admin"),authControllers.loginUser)


export const authRoutes=router