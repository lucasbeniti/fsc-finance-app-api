import {
  badRequest,
  created,
  invalidIdResponse,
  serverError,
  validateId,
  validateRequiredFields,
} from '../helpers/index.js';
import validator from 'validator';

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
        return badRequest({
          message: `The field ${requiredFieldsValidation.missingField} is required`,
        });
      }

      const userIdIsValid = validateId(params.user_id);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      if (params.amount <= 0) {
        return badRequest({ message: 'The amount must be greater than 0.' });
      }
      const amountIsValid = validator.isCurrency(params.amount.toString(), {
        digits_after_decimal: [2],
      });
      if (!amountIsValid) {
        return badRequest({
          message: 'The amount must be currency.',
        });
      }

      const type = params.type.trim().toUpperCase();
      const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENTS'].includes(type);
      if (!typeIsValid) {
        return badRequest({
          message: 'The type must be EARNING, EXPENSE or INVESTMENTS.',
        });
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
