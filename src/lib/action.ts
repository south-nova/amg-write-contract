'use server';

import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NAVER_USER,
    pass: process.env.NAVER_PASSWORD,
  },
});

export const sendEmail = async (subject: string, html: string, attachments: Attachment[]) => {
  try {
    await transporter.sendMail({
      from: process.env.TARGET_EMAIL,
      to: process.env.TARGET_EMAIL,
      subject,
      html,
      attachments,
    });

    console.log(process.env.TARGET_EMAIL);

    return { message: '이메일 전송 성공' };
  } catch (error) {
    console.error(error);
  }
};
