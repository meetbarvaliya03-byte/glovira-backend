// 🔐 LOAD ENV FIRST (VERY IMPORTANT)
import dotenv from "dotenv";
dotenv.config();

// =======================
// CORE IMPORTS
// =======================
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

// =======================
// ROUTES (AFTER dotenv)
// =======================
import enquiryRoutes from "./routes/enquiryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());
app.use(helmet());

// =======================
// DEBUG (TEMPORARY)
// =======================
console.log("RESEND_API_KEY loaded:", !!process.env.RESEND_API_KEY);

// =======================
// MONGODB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Glovira Backend Running 🚀");
});

// =======================
// ROUTES
// =======================
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
