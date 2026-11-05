import { validateBody } from '../../lib/validation/validation.js';
import { sendMessageDto } from '../auth/dto/message.dto.js';
import * as messageService from './message.service.js'

export const createMessage = async (req, res, next) => {
    try{
        const data = validateBody(sendMessageDto, req.body)
        const {content, receiver} = data
        const sender = req.user?.id
        const createdMessage =  await messageService.createMessage(content, receiver, sender)

        res.json({
            message: "message send Successfully",
            success: true,
            data:createdMessage
        });
    }catch(error){
        next(error);
    }
}