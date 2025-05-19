import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { TUser } from "./auth.interface";
import config from '../../config';



const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Student', 'Teacher'], required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["Active", "Disabled"],default:"Active" },
  },
  { timestamps: true }
  );

  // make the plain password to hash password
  userSchema.pre("save", async function (next) {
    const user = this; 
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  
    next();
  });
  

 export const User = mongoose.model('User', userSchema);