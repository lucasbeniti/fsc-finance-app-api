import { ZodError } from 'zod';
import { EmailAlreadyInUseError } from '../../errors/user.js';
import { updateUserSchema } from '../../schemas/user.js';
import {
  invalidIdResponse,
  validateId,
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

      await updateUserSchema.parseAsync(params);

      const updatedUser = await this.updateUserUseCase.execute(userId, params);
      return ok(updatedUser);
    } catch (err) {
      console.error(err);
      if (err instanceof ZodError) {
        return badRequest({
          message: err.errors[0].message,
        });
      }
      if (err instanceof EmailAlreadyInUseError) {
        return badRequest({
          message: err.message,
        });
      }
      return serverError();
    }
  }
}
