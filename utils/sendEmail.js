import { createTransport } from "nodemailer";


export const sendEmail = async (to, subject, text) => {
  // Replace the following options with your actual email provider's configuration
  const transporter = createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASS
    }
  });

  try {
    await transporter.sendMail({
    //   from: "myid@gmail.com",
      to,
      subject,
      text,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
