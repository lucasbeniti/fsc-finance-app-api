import { badRequest, notFound } from './http.js';
import validator from 'validator';

export const invalidPasswordResponse = () => {
  return badRequest({
    message: 'Password must be at least 6 characters.',
  });
};

export const invalidEmailResponse = () => {
  return badRequest({
    message: 'Invalid e-mail. Please provide a valid one.',
  });
};

export const validateEmail = (email) => validator.isEmail(email);

export const validatePassword = (password) => password.length >= 6;

export const userNotFoundResponse = () => {
  return notFound({
    message: 'User not found.',
  });
};
