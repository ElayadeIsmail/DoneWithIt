import * as TypeGraphQL from 'type-graphql';
import { User } from './User';

export enum Categories {
  Clothes = 'Clothes',
  Accessories = 'Accessories',
  Furniture = 'Furniture',
  Electronics = 'Electronics',
  Books = 'Books',
  Other = 'Other',
}

TypeGraphQL.registerEnumType(Categories, {
  name: 'Categories',
  description: undefined,
});

@TypeGraphQL.ObjectType({
  isAbstract: true,
})
export class Listing {
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
  imageUrl!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Float, {
    nullable: false,
  })
  price!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  description!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  city!: string;

  @TypeGraphQL.Field((_type) => User, {
    nullable: false,
  })
  user?: User;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  userId!: number;

  @TypeGraphQL.Field((_type) => Categories, {
    nullable: false,
  })
  category!:
    | 'Clothes'
    | 'Accessories'
    | 'Furniture'
    | 'Electronics'
    | 'Books'
    | 'Other';
}
