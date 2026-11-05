import * as authRepository  from './auth.repository.js'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { sendEmail } from '../../lib/email/nodemailer.js'
import * as userRepository from '../user/user.repository.js'
import jwt from 'jsonwebtoken'
import { AppError } from '../../pkg/error/error.js'
import { mailjetProvider } from '../../pkg/email/mailjet.js'




export const  register = async (userData) => {
    const userExist = await authRepository.checkUserByEmail(userData.email)
    if(userExist) throw new AppError("User already exists", 409);
    
    userData.password = await bcrypt.hash(userData.password, 10)

    const createdUser = await authRepository.createUser(userData)

    const otp =  crypto.randomInt(100000,999999).toString()

    await authRepository.createOtp({
        code:otp,
        email:userData.email,
        expiersAt: new Date (Date.now() + 1000 * 60 * 5)
    })

    await mailjetProvider.sendMail(
        userData.email,
        "verification code",
        `<h1> your verification code is ${otp}</h1>`
    )
    return createdUser;
}


export const VerifyAccont = async (email, code) => {
    const user = await authRepository.checkUserByEmail(email)
    if(!user) throw new AppError("User not found", 404);

    if(user.isVerified === true) throw new AppError("Account is already verified", 400);

    const otp = await authRepository.getOtpByEmail(email)
    if(!otp) throw new AppError("OTP expired", 400);
    if(otp.code !==  code) throw new AppError("Invalid OTP", 400);

    const updatedUser = await userRepository.updateUserByEmail(email, {isVerified: true})
    await authRepository.deleteOtp(email);
    return updatedUser;
}


export const login = async (email, password) => {
    const user = await authRepository.checkUserByEmail(email)
    if(!user) throw new AppError("User already exists", 409);

    if(user.isVerified === false) throw new AppError("you are not Verified", 403);

    const match = await bcrypt.compare(password, user.password)
    if(!match) throw new AppError("invalid password", 401);

    const token = jwt.sign({id:user._id, email:user.email, name:user.name},
        process.env.JWT_SECRET,
        {expiresIn:toMs(1, 'hours')})

    return token;    
    
}


export const sendOTP = async (email) => {
    const user = await authRepository.checkUserByEmail(email)
    if(!user) throw new AppError("user already exist", 409);

    await authRepository.deleteOtp(email);

    const otp =  crypto.randomInt(100000,999999).toString()
    await mailjetProvider.sendMail(email, 'new OTP', `<p>your new OTP is ${otp}</p>`)
}


export const resetPassword = async (email, code, newPassword) => {
    const storedOtp = await authRepository.getOtpByEmail(email);
    if(!storedOtp) throw new AppError("otp is expired", 400);
    if(storedOtp.code !== code) throw new AppError("invalid code", 400);
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUserByEmail(email, {password: hashedPassword})
    await authRepository.deleteOtp(email)
}