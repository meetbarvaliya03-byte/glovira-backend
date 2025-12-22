import { body } from "express-validator";

export const adminLoginValidation = [
  body("email")
    .isEmail().withMessage("Valid email is required"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
