/* eslint-disable no-undef */
import 'dotenv/config.js';
import express from 'express';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from './src/factories/controllers/user.js';

const app = express();

app.use(express.json());

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

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
