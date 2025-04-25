import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  async sendVerificationEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Your OTP is: ${otp}`,
      html: `<b>Your verification code: ${otp}</b>`,
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Reset token: ${token}`,
      html: `<b>Use this token to reset your password: ${token}</b>`,
    });
  }
}