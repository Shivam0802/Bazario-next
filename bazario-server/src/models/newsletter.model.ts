import mongoose, { Schema, Document } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  subscribedAt: Date;
  createdAt: Date;
}

const newsletter = new mongoose.Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


const Newsletter = mongoose.model<INewsletter>("Newsletter", newsletter);

export default Newsletter;
