import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import {
  ok,
  serverError,
  invalidIdResponse,
  validateId,
  userNotFoundResponse,
} from './helpers/index.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = validateId(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);

      if (!user) {
        return userNotFoundResponse();
      }

      return ok(user);
    } catch (err) {
      console.error(err);
      return serverError();
    }
  }
}
