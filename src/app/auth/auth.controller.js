import * as authService from './auth.service.js'
import { validateBody } from '../../lib/validation/validation.js';
import { loginDto, registerDto, resetPasswordDto, sendOtpDto, verifyAccountDto } from './dto/auth.dto.js';

export const register = async (req, res, next) => {
    try {
        const data = validateBody(registerDto, req.body)
        const createdUser = await authService.register(data);

        res.json({
            message: "User Created Successfully",
            success: true,
            data: createdUser,
        });
    } catch (error) {
        next(error);
    }
}



export const VerifyAccont = async (req, res, next) => {
    try {

        const data = validateBody(verifyAccountDto, req.body)
        const {email , code} = data;
        const updatedUser = await authService.VerifyAccont(email, code)

        res.json({
            message: "User Verified Successfully",
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {
    try {
        const data = validateBody(loginDto, req.body)
        const {email , password} = data;
        const token = await authService.login(email, password)
        res.cookie('access_token', token, {
            httpOnly:true,
            maxAge:toMe(1, 'hours')
        })
        res.json({
            message: "User login Successfully",
            success: true,
        });
    } catch (error) {
        next(error);
    }
}

export const sendOTP = async (req, res, next) => {
    try {
        const data = validateBody(sendOtpDto, req.body)
        const {email} = data;
        await authService.sendOTP(email)
        res.json({
            message: "new OTP sent  , check user email",
            success: true,
        });
    } catch (error) {
        next(error);
    }
}


export const resetPassword = async (req, res, next) => {
    try{
        const data = validateBody(resetPasswordDto, req.body)
        const {email, code, newPassword} = data;
        const updatedPassword = await authService.resetPassword(email, code, newPassword)
        res.json({
            message: "password updated Success",
            success: true,
            data: updatedPassword
        });
    } catch(error){
        next(error);
    }
}