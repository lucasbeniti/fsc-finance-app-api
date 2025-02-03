import { EmailAlreadyInUseError } from '../../errors/user.js';
import {
  invalidEmailResponse,
  invalidPasswordResponse,
  validateEmail,
  validatePassword,
  badRequest,
  created,
  serverError,
} from '../helpers/index.js';

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ['first_name', 'last_name', 'email', 'password'];
      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }

      const passwordIsValid = validatePassword(params.password);
      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      const emailIsValid = validateEmail(params.email);
      if (!emailIsValid) {
        return invalidEmailResponse();
      }

      const createdUser = await this.createUserUseCase.execute(params);
      return created(createdUser);
    } catch (err) {
      if (err instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: err.message,
        });
      }
      console.error(err);
      return serverError();
    }
  }
}
