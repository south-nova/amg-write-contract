import { PrismaClient } from '@prisma/client';

import { generateBase62 } from '@/lib/base62generate';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { companyName, pay, payDate, payCycle, startDate, endDate } = await request.json();
  const link = generateBase62(5);

  try {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    await prisma.contract.create({
      data: {
        link,
        companyName,
        pay,
        payDate,
        payCycle,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      },
    });

    return new Response(JSON.stringify({ msg: 'success', link }), {
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const link = searchParams.get('link');

  if (!link) {
    return new Response(JSON.stringify({ error: 'Link is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const contract = await prisma.contract.findUnique({
      where: { link },
    });

    if (!contract) {
      return new Response(JSON.stringify({ error: 'Contract not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(contract), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching contract:', error);

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
