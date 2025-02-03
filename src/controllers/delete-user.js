import {
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
  validateId,
} from '../controllers/helpers/index.js';

export class DeleteUserController {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = validateId(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const deletedUser = await this.deleteUserUseCase.execute(userId);
      if (!deletedUser) {
        return userNotFoundResponse();
      }
      return ok(deletedUser);
    } catch (err) {
      console.error(err);
      return serverError();
    }
  }
}
