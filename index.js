/* eslint-disable no-undef */
import 'dotenv/config.js';
import express from 'express';
import {
  GetUserByIdController,
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
} from './src/controllers/index.js';
import {
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  CreateUserUseCase,
} from './src/use-cases/index.js';
import {
  PostgresDeleteUserRepository,
  PostgresCreateUserRepository,
  PostgresUpdateUserRepository,
  PostgresGetUserByIdRepository,
  PostgresGetUserByEmailRepository,
} from './src/repositories/postgres/index.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
  const postgresCreateUserRepository = new PostgresCreateUserRepository();
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const createUserUseCase = new CreateUserUseCase(
    postgresCreateUserRepository,
    postgresGetUserByEmailRepository
  );
  const createUserController = new CreateUserController(createUserUseCase);
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (req, res) => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(
    postgresGetUserByIdRepository
  );
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(req);
  res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (req, res) => {
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const updateUserUseCase = new UpdateUserUseCase(
    postgresUpdateUserRepository,
    postgresGetUserByEmailRepository
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);
  const { statusCode, body } = await updateUserController.execute(req);
  res.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (req, res) => {
  const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  const { statusCode, body } = await deleteUserController.execute(req);
  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
