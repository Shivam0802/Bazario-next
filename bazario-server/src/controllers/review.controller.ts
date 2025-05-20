import { Request, Response, NextFunction } from "express";
import Review from "../models/review.model";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

//@desc Add a review

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body, "req.body");
    const { productId, rating, review, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided." });
    }

    const filenames = (req.files as Express.Multer.File[]).map(
      (file) => file.filename
    );

    const reviewData = new Review({
      productId,
      rating,
      comment: review,
      userId,
      images: filenames, // Store the filenames of uploaded images
    });

    await reviewData.save();

    return res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get all reviews

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId as string)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const reviews = await Review.find({ productId });

    const reviewsWithFullImageUrls = reviews.map((review) => ({
      ...review.toObject(),
      images: review.images?.length
        ? review.images.map(
            (image: string) => `${process.env.BASE_URL}/uploads/${image}`
          )
        : []
    }));

    return res.status(200).json({ data: reviewsWithFullImageUrls , message: "Reviews retrieved successfully" });
  } catch (error) {
    console.error("Error getting all reviews:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
