import mongoose from "mongoose";

interface IContactUs extends mongoose.Document {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  createdAt: Date;
}

const contactUsSchema = new mongoose.Schema<IContactUs>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactUs = mongoose.model<IContactUs>("ContactUs", contactUsSchema);

export default ContactUs;
