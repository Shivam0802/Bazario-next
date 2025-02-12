import mongoose, { Types } from "mongoose";
import Product from "../models/product.model";
import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name, description, price, discountedPrice, stock, availability, category, brand, sku, weight, dimensions, shippingOptions, returnPolicy, colors, sizes, material, warranty, tags, userId, customFields,
    } = req.body;

    // Check if files are uploaded
    if (!req.files || (req.files as unknown as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const filenames = (req.files as unknown as Express.Multer.File[]).map(file => file.filename);

    // Create product document with provided data
    const product = new Product({
      userId,
      name,
      description,
      price,
      discountedPrice,
      stock,
      availability,
      category,
      brand,
      sku,
      weight,
      dimensions,
      shippingOptions,
      returnPolicy,
      colors,
      sizes,
      material,
      warranty,
      tags,
      images: filenames,
      customFields: customFields || [], // Store custom fields if provided
    });

    // Save the product to the database
    await product.save();

    // Respond with success
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getProduct = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.query.userId as string;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    console.log("Searching for userId:", userId);
    
    let products = await Product.find({ userId }).lean(); 
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    
    //const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    products = products.map((product: any) => ({
      ...product,
      imageUrls: Array.isArray(product.images) && product.images.length > 0
        ? product.images.map((image: string) => `${process.env.BASE_URL}/uploads/${image}`)
        : [],
    }));
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let products = await Product.find().lean();

    //const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    products = products.map((product: any) => ({
      ...product,
      imageUrls: product.images?.length
        ? product.images.map((image: string) => `${process.env.BASE_URL}/uploads/${image}`)
        : [],
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $addFields: {
          businessName: "$user.businessName",
          imageUrls: {
            $map: {
              input: "$images",
              as: "image",
              in: {
                $concat: [process.env.BASE_URL, "/uploads/", "$$image"],
              },
            },
          }
        },
      },
      {
        $project: {
          user: 0,
        },
      },
    ];

    const result = await Product.aggregate(pipeline);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





