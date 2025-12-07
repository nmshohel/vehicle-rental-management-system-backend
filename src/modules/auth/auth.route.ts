import express from "express"
import { authControllers } from "./auth.controller"
import auth from "../../middleware/auth"
const router=express.Router()

router.post("/signup",authControllers.createUsers)
router.post("/signin",authControllers.loginUser)


export const authRoutes=router