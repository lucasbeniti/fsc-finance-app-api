import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from '../../controllers/index.js';
import {
  PostgresCreateUserRepository,
  PostgresDeleteUserRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../use-cases/index.js';

export const makeGetUserByIdController = () => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(
    postgresGetUserByIdRepository
  );
  return new GetUserByIdController(getUserByIdUseCase);
};

export const makeUpdateUserController = () => {
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const updateUserUseCase = new UpdateUserUseCase(
    postgresUpdateUserRepository,
    postgresGetUserByEmailRepository
  );
  return new UpdateUserController(updateUserUseCase);
};

export const makeCreateUserController = () => {
  const postgresCreateUserRepository = new PostgresCreateUserRepository();
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const createUserUseCase = new CreateUserUseCase(
    postgresCreateUserRepository,
    postgresGetUserByEmailRepository
  );
  return new CreateUserController(createUserUseCase);
};

export const makeDeleteUserController = () => {
  const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);
  return new DeleteUserController(deleteUserUseCase);
};
