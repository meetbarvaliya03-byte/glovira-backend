import express from "express";
import { createEnquiry } from "../controllers/enquiryController.js";
import { enquiryValidation } from "../validators/enquiryValidator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", enquiryValidation, validate, createEnquiry);

export default router;
