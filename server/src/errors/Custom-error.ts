import { ApolloError } from 'apollo-server-express';

export class CustomError extends ApolloError {
  constructor(message: string, errorCode: string) {
    super(message, errorCode);

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }
}
