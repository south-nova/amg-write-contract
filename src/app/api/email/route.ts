import { Attachment } from 'nodemailer/lib/mailer';

import { sendEmail } from '@/lib/action';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const subject = formData.get('subject') as string;
    const contentHtml = formData.get('contentHTML') as string;
    const idCard = formData.get('idCard') as File;
    const bankbook = formData.get('bankbook') as File;
    const contract = formData.get('contract') as File;

    const idCardBuffer = await idCard.arrayBuffer();
    const bankbookBuffer = await bankbook.arrayBuffer();
    const contractBuffer = await contract.arrayBuffer();

    const attachments: Attachment[] = [
      {
        filename: '신분증.jpg',
        content: Buffer.from(idCardBuffer),
      },
      {
        filename: '통장사본.jpg',
        content: Buffer.from(bankbookBuffer),
      },
      {
        filename: '계약서.jpg',
        content: Buffer.from(contractBuffer),
      },
    ];

    await sendEmail(subject, contentHtml, attachments);

    return new Response(JSON.stringify({ msg: 'success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating contract:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
