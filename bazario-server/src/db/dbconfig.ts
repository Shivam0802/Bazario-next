import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbconnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: Bazario DB`);

    return mongoose.connection;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Error: ${error}`);
    }
    process.exit(1);
  }
};

export default dbconnection;