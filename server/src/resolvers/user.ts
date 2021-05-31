import * as argon2 from 'argon2';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { COOKIE_NAME } from '../constants';
import { isAuth } from '../middlewares/isAuth';
import { User } from '../models';
import { MyContext } from '../types';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';
import { sendEmail } from '../utils/sendEmail';
import { RegisterInputs } from '../utils/user-types';
import { validateRegister } from '../utils/validate-register';

@ObjectType()
export class FieldError {
  @Field()
  field?: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserInfo {
  @Field(() => Boolean)
  currentUser?: boolean;
  @Field(() => User, { nullable: true })
  user?: User | null;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  name(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: RegisterInputs,
    @Ctx() { prisma, redis }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await prisma.user.create({
        data: {
          firstName: options.firstName,
          lastName: options.lastName,
          email: options.email,
          password: hashedPassword,
        },
      });
      await sendEmail(
        options.email,
        await createConfirmationUrl(user.id, redis)
      );
    } catch (err) {
      if (err.code === 'P2002') {
        return {
          errors: [
            {
              field: err.meta.target[0],
              message: `${err.meta.target[0]} already taken`,
            },
          ],
        };
      }
      console.log('message:', err.message);
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { prisma, req }: MyContext
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid Credentials',
          },
        ],
      };
    }
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid Credentials',
          },
        ],
      };
    }
    if (!user.confirmed) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Please Confirm your Email ',
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => User, { nullable: true })
  async confirmUser(
    @Arg('token') token: string,
    @Ctx() { prisma, redis, req }: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(token);
    if (!userId) {
      return null;
    }
    const user = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        confirmed: true,
      },
    });
    await redis.del(token);
    req.session.userId = user.id;
    return user;
  }

  @Query(() => UserInfo)
  async user(
    @Arg('userId', () => Int) userId: number,
    @Ctx() { req, prisma }: MyContext
  ): Promise<UserInfo> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return {
      currentUser: req.session.userId === user?.id,
      user,
    };
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg('avatar') avatar: string,
    @Ctx() { req, prisma }: MyContext
  ) {
    return prisma.user.update({
      where: {
        id: req.session.userId,
      },
      data: {
        avatar,
      },
    });
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req, prisma }: MyContext): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
    });
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err: Error) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log('logout Err:', err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
