import validator from 'validator';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  validateEmail,
  validatePassword,
} from './helpers/user.js';
import { badRequest, ok, serverError } from './helpers/http.js';

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const userId = httpRequest.params.userId;
      const isIdValid = validator.isUUID(userId);
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
        const passwordIsValid = validatePassword();
        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      if (params.email) {
        const emailIsValid = validateEmail();
        if (!emailIsValid) {
          return invalidEmailResponse;
        }
      }

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(userId, params);
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
