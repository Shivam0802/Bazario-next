import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  userId: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  sku: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  availability: "In-Stock" | "Out-Of-Stock" | "Pre-Order";
  images: [string];
  videos?: string[];
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
  shippingOptions?: string[];
  returnPolicy?: string;
  colors?: string[];
  sizes?: string[];
  material?: string;
  warranty?: string;
  tags?: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  customFields?: { key: string; value: string }[];  // Add a custom fields section
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    userId: { type: Types.ObjectId },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    subCategory: {type: String},
    brand: { type: String },
    sku: { type: String },
    price: { type: Number },
    discountedPrice: { type: Number },
    stock: { type: Number },
    availability: {
      type: String,
      enum: ["In-Stock", "Out-Of-Stock", "Pre-Order"],
    },
    images: [String],
    videos: { type: [String] },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    shippingOptions: { type: [String] },
    returnPolicy: { type: String },
    colors: { type: [String] },
    sizes: { type: [String] },
    material: { type: String },
    warranty: { type: String },
    tags: { type: [String] },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
    },
    customFields: [{ key: { type: String }, value: { type: String } }],  // To store dynamic custom fields
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);

