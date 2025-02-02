import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { notFound, ok, serverError } from './helpers/http.js';
import { invalidIdResponse, validateId } from './helpers/user.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = validateId();
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

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
