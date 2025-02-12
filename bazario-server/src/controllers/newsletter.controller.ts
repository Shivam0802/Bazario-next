import mongoose from "mongoose";
import Newsletter, { INewsletter } from "../models/newsletter.model";
import { Request, Response } from "express";

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await Newsletter.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already subscribed" });
    }

    const newsletterSubscriber = new Newsletter(req.body);
    await newsletterSubscriber.save();
    res
      .status(200)
      .json({ message: "User subscribed to newsletter successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
