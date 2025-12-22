import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@glovira.com",
    password: hashedPassword, // ✅ FIXED
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();
