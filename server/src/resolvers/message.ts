import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { PUBSUB_NEW_MESSAGE } from '../constants';
import { isAuth } from '../middlewares/isAuth';
import { Message } from '../models/Message';
import { MyContext } from '../types';

@ObjectType()
export class MessagePayload {
  @Field(() => Message)
  newMessage: Message;
}
@ObjectType()
export class MessageArgs {
  @Field(() => Int)
  listingId: number;
}

@Resolver()
export class MessageResolver {
  @Query(() => [Message!])
  async messages(
    @Arg('listingId', () => Int) listingId: number,
    @Ctx() { prisma }: MyContext
  ): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        listingId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('listingId', () => Int) listingId: number,
    @Arg('text') text: string,
    @Ctx() { req, prisma }: MyContext
  ): Promise<boolean> {
    const message = await prisma.message.create({
      data: {
        text,
        userId: req.session.userId!,
        listingId,
      },
      include: {
        user: true,
      },
    });
    await pubSub.publish(PUBSUB_NEW_MESSAGE, {
      newMessage: message,
    });
    return true;
  }

  @Subscription(() => Message, {
    topics: PUBSUB_NEW_MESSAGE,
    filter: ({ payload, args }) =>
      payload.newMessage.listingId === args.listingId,
  })
  newMessage(
    @Root() MessagePayload: MessagePayload,
    @Arg('listingId', () => Int) _: number
  ) {
    return MessagePayload.newMessage;
  }
}
