import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import {
  notFound,
  ok,
  serverError,
  invalidIdResponse,
  validateId,
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
        return notFound({
          message: 'User not found.',
        });
      }

      return ok(user);
    } catch (err) {
      console.error(err);
      return serverError();
    }
  }
}
