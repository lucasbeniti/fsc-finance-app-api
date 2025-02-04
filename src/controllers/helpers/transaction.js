import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfAmountIsValid = (amount) => {
  if (typeof amount != 'number') {
    return false;
  }
  return validator.isCurrency(amount.toFixed(2), {
    digits_after_decimal: [2],
    allow_negatives: false,
  });
};

export const checkIfTypeIsValid = (type) => {
  return ['EARNING', 'EXPENSE', 'INVESTMENTS'].includes(type);
};

export const invalidAmountResponse = () => {
  return badRequest({
    message: 'The amount must be currency.',
  });
};

export const invalidTypeResponse = () => {
  return badRequest({
    message: 'The type must be EARNING, EXPENSE or INVESTMENTS.',
  });
};
