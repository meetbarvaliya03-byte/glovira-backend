import nodemailer from "nodemailer";
import dotenv from "dotenv";

/* 🔥 LOAD ENV HERE (CRITICAL FIX) */
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* Optional: verify once at startup */
transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail transporter error:", error.message);
  } else {
    console.log("✅ Mail server ready");
  }
});

export const sendAdminEmail = async ({ name, email, product, message }) => {
  return transporter.sendMail({
    from: `"Glovira Overseas" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // admin email
    replyTo: email, // 🔥 so you can reply directly to customer
    subject: `📩 New Enquiry – ${product}`,
    html: `
      <h3>New Enquiry Received</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Product:</b> ${product}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `,
  });
};
