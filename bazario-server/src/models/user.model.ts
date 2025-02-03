import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  contact: string;
  dob: Date;
  gender: string;
  password: string;
  isActive: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  contact: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
