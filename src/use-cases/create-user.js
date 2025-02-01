import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user';

export class CreateUserUseCase {
  async execute(createUserParams) {
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
