import mongoose, {Types} from "mongoose";

interface IProduct extends mongoose.Document{
     sellerId: Types.ObjectId;
     name: string;
     price: number;
     description: string;
     category: string;
     subCategory: string;
     brand: string;
     productImage: [string];
     productColor: [string];
     stock: number;
     additionalField: {};
     createdAt: Date;
     updatedAt: Date;
}

const productSchema = new mongoose.Schema ({
     name: { type: String, required: true },
     price: { type: Number, required: true },
     description: { type: String, required: true },
     category: { type: String, required: true },
     subCategory: { type: String, required: true },
     brand: { type: String, required: true },
     productImage: { type: [String], required: true },
     productColor: { type: [String], required: true },
     stock: { type: Number, required: true },
     additionalField: { type: mongoose.Schema.Types.Mixed, required: false },
     createdAt: { type: Date, default: Date.now },
     updatedAt: { type: Date, default: Date.now }
})

const Product = mongoose.model<IProduct>("User", productSchema);
export default Product;