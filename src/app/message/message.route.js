import { Router } from "express";
import * as messageController from './message.controller.js'
import { authGuard } from "../../lib/auth/guard.js";

const messageRouter = new Router()

messageRouter.post('/send', messageController.createMessage)
messageRouter.post('/public', authGuard, messageController.createMessage)


export default messageRouter