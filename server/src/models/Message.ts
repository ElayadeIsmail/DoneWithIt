import * as TypeGraphQL from 'type-graphql';
import { Listing } from './Listing';
import { User } from './User';

@TypeGraphQL.ObjectType({
  isAbstract: true,
})
export class Message {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  text!: string;

  @TypeGraphQL.Field((_type) => User, {
    nullable: false,
  })
  user?: User;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  userId!: number;

  listing?: Listing;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  listingId!: number;
}
