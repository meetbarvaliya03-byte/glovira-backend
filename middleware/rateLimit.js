import rateLimit from "express-rate-limit";

/* GENERAL LIMIT */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  message: "Too many requests, please try again later",
});

/* ADMIN LOGIN LIMIT (STRICT) */
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // only 10 login attempts
  message: "Too many login attempts, try later",
});
