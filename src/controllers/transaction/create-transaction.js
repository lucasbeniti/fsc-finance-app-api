import {
  created,
  invalidIdResponse,
  requiredFieldIsMissingResponse,
  serverError,
  validateId,
  validateRequiredFields,
  checkIfAmountIsValid,
  checkIfTypeIsValid,
  invalidAmountResponse,
  invalidTypeResponse,
} from '../helpers/index.js';

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ['user_id', 'name', 'amount', 'date', 'type'];
      const requiredFieldsValidation = validateRequiredFields(
        params,
        requiredFields
      );
      if (!requiredFieldsValidation.ok) {
        return requiredFieldIsMissingResponse(
          requiredFieldsValidation.missingField
        );
      }

      const userIdIsValid = validateId(params.user_id);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const amountIsValid = checkIfAmountIsValid(params.amount);
      if (!amountIsValid) {
        return invalidAmountResponse();
      }

      const type = params.type.trim().toUpperCase();
      const typeIsValid = checkIfTypeIsValid(type);
      if (!typeIsValid) {
        return invalidTypeResponse();
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      });

      return created(transaction);
    } catch (err) {
      console.error(err);
      return serverError();
    }
  }
}
