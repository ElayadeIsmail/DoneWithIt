import { Query, Resolver } from 'type-graphql';
import { CustomError } from '../errors/Custom-error';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    throw new CustomError('Not Authorized', '401');
    return 'Hello World';
  }
}
