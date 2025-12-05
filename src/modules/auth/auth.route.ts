import express from "express"
import { authControllers } from "./auth.controller"
const router=express.Router()

router.post("/signup",authControllers.createUsers)


export const authRoutes=router