import Message from './message.model.js'


export const createMessage = async (content, receiver, sender) => {
    return await Message.create({
        content:content,
        receiver:receiver,
        sender:sender
    })
}