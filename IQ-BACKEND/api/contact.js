import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendContactMail({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"iQ Entertainment Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    subject: "New Contact Form Message",
    text: `
Name: ${name || "No name provided"}
Email: ${email}
Message:
${message}
    `,
  };

  return transporter.sendMail(mailOptions);
}
