import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { COOKIE_NAME, __prod__ } from './constants';
import { ListingResolver } from './resolvers/listing';
import { MessageResolver } from './resolvers/message';
import { UserResolver } from './resolvers/user';
const http = require('http');

const prisma = new PrismaClient({
  log: ['query', 'error'],
  errorFormat: 'pretty',
});

const main = async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  const pubSub = new RedisPubSub();
  // await prisma.listing.deleteMany({});
  // await prisma.listing.delete({
  //   where: {
  //     id: ,
  //   },
  // });
  // const users = await prisma.user.findMany();
  // console.log(users);
  // await prisma.message.deleteMany({});

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 3600 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__,
        sameSite: 'lax',
      },
      saveUninitialized: false,
      secret: process.env.SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ListingResolver, UserResolver, MessageResolver],
      validate: false,
      pubSub,
    }),
    context: ({ req, res }) => ({ req, res, prisma, redis, pubSub }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(parseInt(process.env.PORT), () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  });
};

main()
  .catch((err) => console.log(err.message))
  .finally(async () => {
    await prisma.$disconnect();
  });
