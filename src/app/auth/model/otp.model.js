import { Schema , model } from "mongoose";


const otpSchema = new Schema({
  code: {
    type: String,
    required: true,
    length: 6,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OTP = model("OTP", otpSchema);

export default OTP;