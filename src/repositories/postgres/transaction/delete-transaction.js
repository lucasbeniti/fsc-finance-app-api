import { prisma } from '../../../../prisma/prisma';

export class PostgresDeletTransactionRepository {
  async execute(transactionId) {
    try {
      return await prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      });
    } catch (err) {
      return null;
    }
  }
}
