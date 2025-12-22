import Enquiry from "../models/Enquiry.js";

/* =======================
   CREATE ENQUIRY (PUBLIC)
======================= */
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, product, message } = req.body;

    // ✅ VALIDATION
    if (!name || !email || !product || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ SAVE TO DATABASE
    const enquiry = await Enquiry.create({
      name,
      email,
      product,
      message,
      isRead: false,
    });

    // ✅ SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });

  } catch (error) {
    console.error("❌ Enquiry Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =======================
   ADMIN ACTIONS
======================= */
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const markRead = async (req, res) => {
  try {
    await Enquiry.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};
