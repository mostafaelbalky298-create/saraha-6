import { mailjetProvider } from "../../pkg/email/mailjet.js";
import { env } from "../config/env.js"; 

export const mailjetProvider = new mailjetProvider({
  apiKey: env.mailjet.apiKey,
  apiSecret: env.mailjet.apiSecret,
  fromEmail: env.mailjet.fromEmail,
  fromName: env.mailjet.fromName,
});