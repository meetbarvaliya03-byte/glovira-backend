import express from "express";
import { createEnquiry } from "../controllers/enquiryController.js";
import { enquiryValidation } from "../validators/enquiryValidator.js";
import { validate } from "../middleware/validate.js";
import { generalLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

/*
  ✅ PUBLIC ENQUIRY ROUTE
  ❌ NO verifyAdmin HERE
*/
router.post("/", generalLimiter, enquiryValidation, validate, createEnquiry);

export default router;
