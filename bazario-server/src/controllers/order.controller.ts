import { Request, Response, NextFunction, Express } from "express";
import mongoose from "mongoose";
import Order from "../models/order.model";
import User from "../models/user.model";

// place order

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    // Check if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check if each productId is valid
    for (const product of products) {
      if (!mongoose.Types.ObjectId.isValid(product.productId)) {
        return res
          .status(400)
          .json({ message: `Invalid product ID: ${product.productId}` });
      }
    }

    const order = {
      userId,
      products,
      paymentMethod: req.body.paymentMethod,
      shippingAddress: req.body.shippingAddress,
      totalAmount: req.body.totalAmount,
      status: "Order Placed",
      cancelled: false,
      cancelledAt: null,
    };

    const placedOrder = new Order(order);
    await placedOrder.save();
    res.status(200).json(placedOrder);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// get orders by user
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId || Array.isArray(userId)) {
      return res
        .status(400)
        .json({ message: "User ID is required and must be a single value" });
    }

    const userIdString = String(userId);
    const pipeline = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userIdString),
        },
      },
      {
        $unwind: "$products", // Unwind products to access each product separately
      },
      {
        $lookup: {
          from: "products", // Fetch product details from the "products" collection
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true, // Keep records even if product details are missing
        },
      },
      {
        $addFields: {
          "productDetails.imageUrls": {
            $map: {
              input: { $ifNull: ["$productDetails.images", []] },
              as: "image",
              in: {
                $concat: [
                  process.env.BASE_URL,
                  "/uploads/",
                  { $toString: "$$image" },
                ],
              },
            },
          },
          "productDetails.quantity": "$products.quantity", // Include the quantity from the orders collection
        },
      },
      {
        $group: {
          _id: "$_id",
          products: { $push: "$productDetails" },
          createdAt: { $first: "$createdAt" },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          shippingAddress: { $first: "$shippingAddress" },
          paymentMethod: { $first: "$paymentMethod" },
          cancelled: { $first: "$cancelled" },
        },
      },
    ];

    const orders = await Order.aggregate(pipeline);

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get Order by ID

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.params;

    console.table(req.params);
    const matchObj = {};

    if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const pipeline = [
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.productId": new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "productDetails.imageUrls": {
            $map: {
              input: { $ifNull: ["$productDetails.images", []] },
              as: "image",
              in: {
                $concat: [
                  process.env.BASE_URL,
                  "/uploads/",
                  { $toString: "$$image" },
                ],
              },
            },
          },
          "productDetails.quantity": "$products.quantity",
        },
      },
      {
        $group: {
          _id: "$_id",
          products: { $push: "$productDetails" },
          createdAt: { $first: "$createdAt" },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          shippingAddress: { $first: "$shippingAddress" },
          paymentMethod: { $first: "$paymentMethod" },
        },
      },
    ];

    const result = await Order.aggregate(pipeline);
    console.log("Matched Orders:", result);

    const order = await Order.aggregate(pipeline);

    res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id, "id");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.cancelled = true;
    order.cancelledAt = new Date();
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};