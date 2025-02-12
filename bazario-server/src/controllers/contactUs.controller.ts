import { Request, Response } from "express";
import ContactUs from "../models/contactUs.model";
import { sendEmail } from "../helpers/email";

export const contactUs = async (req: Request, res: Response) => {
   try{
    const contactUs = new ContactUs(req.body);
    await contactUs.save();

    const mailOptions = {
      from : req.body.email,
      to: process.env.EMAIL_USER,
      subject: "Contact Us",
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nContact Number: ${req.body.contactNumber}\nMessage: ${req.body.message}`,
    }; 
    
    await sendEmail(mailOptions);

    res.status(200).json({ message: "Message sent successfully" });
   } catch (err){
    res.status(500).json({ message: "Something went wrong." });
   }
};