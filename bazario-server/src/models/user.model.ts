import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  role: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  contact: string;
  dob: Date;
  gender: string;
  password: string;
  panCardandTaxID: string;
  gstNumber: string;
  businessName: string;
  businessType: string;
  paymentMethod: string;
  cinNumber: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessPinCode: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  isActive: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "User" },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  contact: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  panCardandTaxID: { type: String },
  gstNumber: { type: String },
  businessName: { type: String },
  businessType: { type: String },
  PaymentMethod: { type: String },
  cinNumber: { type: String },
  businessAddress: { type: String },
  businessCity: { type: String },
  businessState: { type: String },
  businessPinCode: { type: String },
  bankName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  upiId: { type: String },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
