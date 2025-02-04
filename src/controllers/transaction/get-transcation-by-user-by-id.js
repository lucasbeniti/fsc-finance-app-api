import { UserNotFoundError } from '../../errors/user.js';
import {
  invalidIdResponse,
  ok,
  requiredFieldIsMissingResponse,
  serverError,
  userNotFoundResponse,
  validateId,
} from '../helpers/index.js';

export class GetUserTransactionByUserIdController {
  constructor(getTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;
      if (!userId) {
        return requiredFieldIsMissingResponse('userId');
      }

      const userIdIsValid = validateId(userId);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const transactions = await this.getTransactionsByUserIdUseCase.execute({
        userId,
      });

      return ok(transactions);
    } catch (err) {
      console.error(err);
      if (err instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      return serverError();
    }
  }
}
