import express from "express";
import {
  loginAdmin,
  getEnquiries,
  markRead,
  deleteEnquiry,
} from "../controllers/adminController.js";

import { adminLoginValidation } from "../validators/adminValidator.js";
import { validate } from "../middleware/validate.js";
import { adminLoginLimiter } from "../middleware/rateLimit.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* 🔓 ADMIN LOGIN (PUBLIC) */
router.post(
  "/login",
  adminLoginLimiter,
  adminLoginValidation,
  validate,
  loginAdmin
);

/* 🔐 ADMIN PROTECTED ROUTES */
router.get("/enquiries", verifyAdmin, getEnquiries);
router.patch("/enquiry/:id/read", verifyAdmin, markRead);
router.delete("/enquiry/:id", verifyAdmin, deleteEnquiry);

export default router;
