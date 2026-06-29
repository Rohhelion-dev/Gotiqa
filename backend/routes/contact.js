const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, contactInfo, message } = req.body;

    if (!name || !contactInfo || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, contact information, and message are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Gotiqa Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || "kirorei04@gmail.com",
      subject: `New Gotiqa Contact Message from ${name}`,
      html: `
        <h2>New Gotiqa Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${contactInfo}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

module.exports = router;