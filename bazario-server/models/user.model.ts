import mongoose from "mongoose";

interface IUser extends mongoose.Document {
   firstName: string;
   lastName: string;
   email: string;
   address: string;
   contact: string;
   dob: Date;
   gender: string;
   password: string;
}

const userSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   address: { type: String, required: true },
   contact: { type: String, required: true },
   dob: { type: Date, required: true },
   gender: { type: String, required: true },
   password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;