import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInputs {
  @Field({ nullable: false })
  firstName: string;
  @Field({ nullable: false })
  lastName: string;
  @Field({ nullable: false })
  email: string;
  @Field({ nullable: false })
  password: string;
}
