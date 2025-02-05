import {
  badRequest,
  checkIfAmountIsValid,
  checkIfTypeIsValid,
  invalidAmountResponse,
  invalidIdResponse,
  invalidTypeResponse,
  ok,
  serverError,
  validateId,
} from '../helpers/index.js';

export class UpdateTransactionController {
  constructor(updateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const idIsValid = validateId(httpRequest.params.transactionId);
      if (!idIsValid) {
        return invalidIdResponse();
      }

      const allowedFields = ['name', 'amount', 'date', 'type'];
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field)
      );
      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Some provided field is not allowed.',
        });
      }

      if (params.amount) {
        const amountIsValid = checkIfAmountIsValid(params.amount);
        if (!amountIsValid) {
          return invalidAmountResponse();
        }
      }

      if (params.type) {
        const typeIsValid = checkIfTypeIsValid(params.type);
        if (!typeIsValid) {
          return invalidTypeResponse();
        }
      }

      const transaction = await this.updateTransactionUseCase.execute(
        params.transactionId,
        params
      );

      return ok(transaction);
    } catch (err) {
      console.error(err);
      return serverError();
    }
  }
}
