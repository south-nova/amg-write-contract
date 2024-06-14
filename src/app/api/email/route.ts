import { sendEmail } from '@/lib/action';

export async function POST(request: Request) {
  const { subject, contentHtml, attachments } = await request.json();

  try {
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
