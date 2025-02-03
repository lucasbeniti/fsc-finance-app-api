import { EmailAlreadyInUseError } from '../../errors/user.js';
import {
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  validateEmail,
  validateId,
  validatePassword,
  badRequest,
  ok,
  serverError,
} from '../helpers/index.js';

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const userId = httpRequest.params.userId;
      const isIdValid = validateId(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const allowedFields = ['first_name', 'last_name', 'email', 'password'];
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field)
      );
      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed.',
        });
      }

      if (params.password) {
        const passwordIsValid = validatePassword(params.password);
        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      if (params.email) {
        const emailIsValid = validateEmail(params.email);
        if (!emailIsValid) {
          return invalidEmailResponse;
        }
      }

      const updatedUser = await this.updateUserUseCase.execute(userId, params);
      return ok(updatedUser);
    } catch (err) {
      console.error(err);
      if (err instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: err.message,
        });
      }
      return serverError();
    }
  }
}
