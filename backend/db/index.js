import mongoose from "mongoose";

// Workaround for Node 20+ DNS/SRV resolution issues with MongoDB Atlas (thanks nodejs)
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
