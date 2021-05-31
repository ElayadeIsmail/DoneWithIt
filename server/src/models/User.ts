import * as TypeGraphQL from 'type-graphql';
import { Listing } from './Listing';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
TypeGraphQL.registerEnumType(Role, {
  name: 'Role',
  description: undefined,
});

@TypeGraphQL.ObjectType({
  isAbstract: true,
})
export class User {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  id!: number;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  firstName!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  lastName!: string;

  password!: string;

  confirmed!: boolean;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  avatar!: string;

  @TypeGraphQL.Field((_type) => Role, {
    nullable: false,
  })
  role!: 'USER' | 'ADMIN';

  listings?: Listing[];
}
