/* eslint-disable no-undef */
import 'dotenv/config.js';
import express from 'express';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalanceController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from './src/factories/controllers/user.js';
import {
  makeCreateTransactionController,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js';
// import swaggerUi from 'swagger-ui-express';
// import fs from 'fs';
// import path from 'path';

const app = express();

app.use(express.json());

// Rotas para usuário
app.post('/api/users', async (req, res) => {
  const createUserController = makeCreateUserController();
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();
  const { statusCode, body } = await getUserByIdController.execute(req);
  res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (req, res) => {
  const updateUserController = makeUpdateUserController();
  const { statusCode, body } = await updateUserController.execute(req);
  res.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (req, res) => {
  const deleteUserController = makeDeleteUserController();

  const { statusCode, body } = await deleteUserController.execute(req);
  res.status(statusCode).send(body);
});

app.get('/api/users/:userId/balance', async (req, res) => {
  const getUserBalanceController = makeGetUserBalanceController();
  const { statusCode, body } = await getUserBalanceController.execute(req);
  res.status(statusCode).send(body);
});

// Rotas para transações
app.post('/api/transactions', async (req, res) => {
  const createTransactionController = makeCreateTransactionController();
  const { statusCode, body } = await createTransactionController.execute(req);
  res.status(statusCode).send(body);
});

app.get('/api/transactions', async (req, res) => {
  const getTransactionsByUserIdController =
    makeGetTransactionsByUserIdController();
  const { statusCode, body } = await getTransactionsByUserIdController.execute(
    req
  );
  res.status(statusCode).send(body);
});

app.patch('/api/transactions/:transactionId', async (req, res) => {
  const updateTransactionController = makeUpdateTransactionController();
  const { statusCode, body } = await updateTransactionController.execute(req);
  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);

// const swaggerDocument = JSON.parse(
//   fs.readFileSync(
//     path.join(import.meta.dirname, '../docs/swagger.json'),
//     'utf8'
//   )
// );
// app.use(
//   '/docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// );
