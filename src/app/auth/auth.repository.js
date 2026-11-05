import  User from '../user/user.model.js'
import OTP from './model/otp.model.js'



export const checkUserByEmail = async (email) => {
    return await User.findOne({email:email})
}


export const createUser = async (userData) => {
    return await User.create(userData)
}


export const createOtp = async (otpData) => {
    return await OTP.create(otpData)
}

export const getOtpByEmail = async (email) => {
    return await OTP.findOne({
        email:email
    })
}


export const deleteOtp = async (email) => {
    return await OTP.deleteMany({
        email:email
    })
}