import { Router } from "express";
import * as authController from './auth.controller.js'
import { idempotency } from "../../lib/idempotency/idempotency.js";

const authRouter = new Router()

authRouter.post('/register', authController.register)
authRouter.patch('/Verify-accont', authController.VerifyAccont)
authRouter.post('/login', authController.login)
authRouter.post('/send-otp' , authController.sendOTP)
authRouter.patch('/reset-password', idempotency(), authController.resetPassword)

export default authRouter