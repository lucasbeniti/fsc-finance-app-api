import { UserNotFoundError } from '../../errors/user.js';
import {
  serverError,
  validateId,
  invalidIdResponse,
  ok,
  userNotFoundResponse,
} from '../helpers/index.js';

export class GetUserBalanceController {
  constructor(getUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = validateId(userId);
      if (!idIsValid) {
        return invalidIdResponse();
      }

      const balance = await this.getUserBalanceUseCase.execute({ userId });
      return ok(balance);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      console.error(err);
      return serverError();
    }
  }
}
