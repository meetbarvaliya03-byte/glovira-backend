import Enquiry from "../models/Enquiry.js";
import { sendAdminEmail } from "../utils/emailService.js";

/**
 * CREATE ENQUIRY
 */
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, product, message } = req.body;

    // ✅ Validation
    if (!name || !email || !product || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Save enquiry FIRST (always)
    await Enquiry.create({
      name,
      email,
      product,
      message,
      isRead: false,
    });

    // ✅ Try sending email (NON-BLOCKING)
    try {
      await sendAdminEmail({ name, email, product, message });
    } catch (mailError) {
      console.error("❌ Email failed:", mailError.message);
    }

    // ✅ Always return success
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });

  } catch (error) {
    console.error("Enquiry Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
