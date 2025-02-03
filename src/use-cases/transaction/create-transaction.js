import { v4 } from 'uuid';
import { UserNotFoundError } from '../../errors/user';

export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(createTransactionParams) {
    const userId = createTransactionParams.userId;
    const user = await this.getUserByIdRepository.execute(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = v4();
    const createdTransaction = await this.createTransactionRepository.execute({
      createTransactionParams,
      id: transactionId,
    });

    return createdTransaction;
  }
}
