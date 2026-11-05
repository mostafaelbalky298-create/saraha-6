import User from "./user.model.js";


export const updateUserByEmail = async (email, updatedUser) => {
    return await User.findOneAndUpdate(
        {email: email},
        updatedUser,
        {returnDocument: 'after'}
    )
}


export const findUserById = async (id) => {
    return await userRouter.findOne({_id:id , isDeleted:false})
}