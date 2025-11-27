/**
 * Email Configuration
 */

const nodemailer = require('nodemailer');

let transporter = null;

const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('✅ Email transporter configured');
  } else {
    console.log('⚠️  Email not configured');
  }
};

const sendEmail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    console.log('Email not sent - transporter not configured');
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    });

    console.log('✅ Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email send error:', error);
    return false;
  }
};

module.exports = {
  createTransporter,
  sendEmail
};
