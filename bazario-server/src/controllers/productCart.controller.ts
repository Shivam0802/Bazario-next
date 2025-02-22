import { Request, Response, NextFunction, Express } from "express";
import mongoose from "mongoose";
import ProductCart from "../models/productCart.model";

// Add a product to the cart

export const addProductToCart = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     try {
          const { productId, quantity } = req.body;

          if (!mongoose.Types.ObjectId.isValid(productId)) {    
               return res.status(400).json({ message: "Invalid product ID" });
          }


          const productCard = new ProductCart({
               userId: req.body.userId,
               productId,
               quantity,
          });

          await productCard.save();

          res.status(201).json(productCard);          
     } catch (error) {
          console.error("Error adding product to cart:", error);
          res.status(500).json({ message: "Internal server error" });
     }
};


export const getAllProductCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const pipeline = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $addFields: {
          imageUrls: {
            $map: {
              input: "$product.images",
              as: "image",
              in: {
                $concat: [process.env.BASE_URL, "/uploads/", "$$image"],
              },
            },
          },
        },
      },
      {
        $project: {
          productId: 0,
          userId: 0,
        },
      }
    ];

    const productCart = await ProductCart.aggregate(pipeline);

    res.status(200).json(productCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteProductFromCart = async (req: Request, res: Response) => {
     try {
          const { id } = req.params;
          const deletedProduct = await ProductCart.findByIdAndDelete({ _id: id });
          res.status(200).json(deletedProduct);
     } catch (error) {
          console.error("Error deleting product from cart:", error);
          res.status(500).json({ message: "Internal server error" });
     }
};   