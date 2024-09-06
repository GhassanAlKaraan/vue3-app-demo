import mongoose from "mongoose";

mongoose.set("strictQuery", true);
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("mongoDB connected 🍃");
  } catch (err) {
    console.error("Problem while connecting database:", err);
  }
}
