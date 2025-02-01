import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();
    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);
    if (userWithProvidedEmail) {
      throw new Error('The provided e-mail is already in use.');
    }

    const userId = v4();
    const hashedPassword = await hash(createUserParams.password, 10);
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);
    return createdUser;
  }
}
