import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.ObjectType({
  isAbstract: true,
})
export class Payment {
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
  stripId!: string;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  orderId!: number;
}
