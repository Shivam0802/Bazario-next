import mongoose from "mongoose";

interface IProductCart extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const productCartSchema = new mongoose.Schema<IProductCart>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductCart = mongoose.model<IProductCart>(
  "ProductCart",
  productCartSchema
);

export default ProductCart;
