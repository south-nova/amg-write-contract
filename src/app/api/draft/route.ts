import { PrismaClient } from '@prisma/client';

import { generateBase62 } from '@/lib/base62';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { payCycle, startDate, endDate, companyName, pay, payDate } = await request.json();
  const link = generateBase62(5);

  try {
    await prisma.contract.create({
      data: {
        link,
        companyName,
        pay,
        payDate,
        payCycle,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    const responseBody = JSON.stringify({ msg: 'success', link });
    return new Response(responseBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
