import { hash } from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class UpdateUserUseCase {
  constructor(updateUserRepository, getUserByEmailRepository) {
    this.updateUserRepository = updateUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
        updateUserParams.email
      );

      if (userWithProvidedEmail) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const user = { ...updateUserParams };

    if (updateUserParams.password) {
      const hashedPassword = await hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.updateUserRepository.execute(userId, user);

    return updatedUser;
  }
}
