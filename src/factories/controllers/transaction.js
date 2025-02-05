import { CreateTransactionController } from '../../controllers/transaction/create-transaction.js';
import { GetUserTransactionByUserIdController } from '../../controllers/transaction/get-transcation-by-user-by-id.js';
import { UpdateTransactionController } from '../../controllers/transaction/update-transaction.js';
import {
  PostgresCreateTransactionRepository,
  PostgresGetTransactionByUserId,
  PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js';
import { PostgresUpdateTransactionRepository } from '../../repositories/postgres/transaction/update-transaction.js';
import {
  CreateTransactionUseCase,
  GetTransactionByUserIdUseCase,
  UpdateTransactionUseCase,
} from '../../use-cases/index.js';

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository
  );
  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase
  );
  return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
  const getTransactionsUserByIdRepository =
    new PostgresGetTransactionByUserId();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getTransactionsByUserIdUseCase = new GetTransactionByUserIdUseCase(
    getTransactionsUserByIdRepository,
    getUserByIdRepository
  );
  const getTransactionsByUserIdController =
    new GetUserTransactionByUserIdController(getTransactionsByUserIdUseCase);
  return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository();
  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository
  );
  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase
  );
  return updateTransactionController;
};
