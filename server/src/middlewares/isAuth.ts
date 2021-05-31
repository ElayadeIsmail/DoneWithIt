import { MiddlewareFn } from 'type-graphql';
import { CustomError } from '../errors/Custom-error';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new CustomError('Not Authenticated', '401');
  }
  return next();
};
