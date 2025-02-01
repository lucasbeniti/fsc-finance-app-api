import { CreateUserUseCase } from '../use-cases/create-user.js';

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ['first_name', 'last_name', 'email', 'password'];
      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return {
            statusCode: 400,
            body: {
              errorMessage: `Missing param: ${field}`,
            },
          };
        }
      }

      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);
      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: {
          message: 'Interval server error',
        },
      };
    }
  }
}
