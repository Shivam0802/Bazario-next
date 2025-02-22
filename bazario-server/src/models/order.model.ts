import mongoose from "mongoose";

interface IOrder {
     userId: mongoose.Types.ObjectId;
     products: {
          productId: mongoose.Types.ObjectId;
          quantity: number;
     }[];
     shippingAddress: string;
     paymentMethod: string;
     totalAmount: number;
     cancelled: boolean;
     cancelledAt?: Date;
     createdAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
     userId: { type: mongoose.Schema.Types.ObjectId, required: true },
     products: [
          {
               productId: { type: mongoose.Schema.Types.ObjectId, required: true },
               quantity: { type: Number, required: true },
          },
     ],
     shippingAddress: { type: String, required: true },
     paymentMethod: { type: String, required: true },
     cancelled: { type: Boolean, default: false },
     cancelledAt: { type: Date },
     totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
