import mongoose from "mongoose";

export interface Review {
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema<Review>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: { type: Number },
  comment: { type: String },
  images: { type: [String] },                            
},
{
  timestamps: true,
});

const Review = mongoose.model<Review>("Review", reviewSchema);

export default Review;
