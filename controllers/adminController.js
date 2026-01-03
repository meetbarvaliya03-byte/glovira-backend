import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Enquiry from "../models/Enquiry.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ success: false });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ success: false });

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ success: true, token });
};

export const getEnquiries = async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, data: enquiries });
};

export const markRead = async (req, res) => {
  await Enquiry.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
};

export const deleteEnquiry = async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
