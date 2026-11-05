import { AppError } from '../../pkg/error/error.js'
import * as userRepository from '../user/user.repository.js'
import * as messageRepository from './message.repository.js'


export const createMessage = async (content, receiver, sender) => {
    const user = await userRepository.findUserById(receiver)
    if(!user) throw new AppError('user not found', 403)

    return await messageRepository.createMessage(content, receiver, sender)    
}