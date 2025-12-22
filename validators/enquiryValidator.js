import { body } from "express-validator";

export const enquiryValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail().withMessage("Valid email is required"),

  body("product")
    .trim()
    .notEmpty().withMessage("Product is required"),

  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters"),
];
