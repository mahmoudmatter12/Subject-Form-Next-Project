import mangoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MANGO_API_KEY || "";

if (!mongoURI) {
  console.error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mangoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
