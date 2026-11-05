import { config } from "dotenv";
config()
import './lib/db/mongoose.js'

import express from "express";
import messageRouter from "./app/message/message.route.js";
import userRouter from "./app/user/user.route.js";
import authRouter from "./app/auth/auth.route.js";
import { env } from "./lib/config/env.js";
import { correlationId } from "./lib/correlation/correlationId.js";
import cookieParser from "cookie-parser";
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(correlationId)

app.use('/message', messageRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)


app.use((err, req, res, next) => {
    if (err.isOperational === true) {
        return res.json({
            message: err.message,
            success: false,
            stack: err.stack,
        });
    }

    return res.status(500).json({
        error: 'Something went wrong',
        success: false,
    });
});

app.listen(env.port, ()=> console.log('server started on port 3000'));