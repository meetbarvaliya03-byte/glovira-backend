import express from "express";
import {
  loginAdmin,
  getEnquiries,
  markRead,
  deleteEnquiry,
} from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/enquiries", verifyAdmin, getEnquiries);
router.patch("/enquiry/:id/read", verifyAdmin, markRead);
router.delete("/enquiry/:id", verifyAdmin, deleteEnquiry);

export default router;
