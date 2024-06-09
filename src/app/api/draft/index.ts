import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { generateBase62 } from '@/lib/base62';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { payCycle, startDate, endDate, companyName, pay, payDate } = req.body;

    const link = generateBase62(5);

    try {
      const url = await prisma.contract.create({
        data: {
          link,
          payCycle,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          companyName,
          pay,
          payDate: new Date(payDate),
        },
      });

      res.status(200).json(url);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
