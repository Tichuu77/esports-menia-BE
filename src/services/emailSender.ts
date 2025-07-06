import assert from 'assert';
import { getConfig } from '../config';
import nodemailer from 'nodemailer';

// create reusable transporter
let transporter: nodemailer.Transporter | null = null;

if (
  getConfig().SMTP_USER &&
  getConfig().SMTP_PASSWORD
) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: getConfig().SMTP_USER,
      pass: getConfig().SMTP_PASSWORD,
    },
  });
}

export default class EmailSender {
  subject: string;
  html: string;

  constructor(subject: string, html: string) {
    this.subject = subject;
    this.html = html;
  }

  static get isConfigured() {
    return Boolean(transporter);
  }

  async sendTo(recipient: string) {
    if (!EmailSender.isConfigured) {
      console.error(`Email provider is not configured.`);
      return;
    }

    assert(recipient, 'Recipient is required');
    assert(this.subject, 'Subject is required');
    assert(this.html, 'HTML is required');

    const mailOptions = {
      from: getConfig().SMTP_FROM,
      to: recipient,
      subject: this.subject,
      html: this.html,
    };

    try {
      const info = await transporter!.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('Error sending email with Nodemailer.');
      console.error(error);
      throw error;
    }
  }
}
