import { config } from "dotenv";
import mongoose from "mongoose";
import { env } from "../config/env.js";
config()

mongoose.connect(env.db.url)