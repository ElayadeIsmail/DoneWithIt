import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { CustomError } from '../errors/Custom-error';
import { isAuth } from '../middlewares/isAuth';
import { Categories, Listing } from '../models/Listing';
import { MyContext } from '../types';

@InputType()
export class ListingInput {
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  imageUrl: string;
  @Field({ nullable: false })
  price: number;
  @Field({ nullable: false })
  description: string;
  @Field({ nullable: false })
  city: string;
  @Field({ nullable: false })
  category: Categories;
}

@ObjectType()
export class PaginatedListing {
  @Field(() => [Listing])
  listings: Listing[];
  @Field(() => Boolean)
  hasMore: boolean;
}
@ObjectType()
export class ListingResponse {
  @Field(() => Listing, { nullable: true })
  listing?: Listing;
  @Field(() => Boolean)
  currentUserListing: boolean;
}

@Resolver()
export class ListingResolver {
  @Mutation(() => Listing)
  @UseMiddleware(isAuth)
  async createListing(
    @Arg('inputs') inputs: ListingInput,
    @Ctx() { req, prisma }: MyContext
  ): Promise<Listing> {
    return prisma.listing.create({
      data: {
        userId: req.session.userId!,
        ...inputs,
      },
    });
  }

  @Mutation(() => Listing)
  @UseMiddleware(isAuth)
  async updateListing(
    @Arg('inputs') inputs: ListingInput,
    @Arg('listingId', () => Int) listingId: number,
    @Ctx() { req, prisma }: MyContext
  ): Promise<Listing> {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });
    if (req.session.userId !== listing?.userId) {
      throw new CustomError('Not Authorized', '401');
    }
    return prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        ...inputs,
      },
    });
  }

  @Query(() => PaginatedListing)
  async listings(
    @Arg('cursor', () => Int, { nullable: true }) cursor: number,
    @Arg('limit', () => Int, { nullable: false }) limit: number,
    @Arg('category', { nullable: true }) category: string,
    @Arg('city', { nullable: true }) city: string,
    @Arg('name', { nullable: true }) name: string,
    @Ctx() { prisma }: MyContext
  ): Promise<PaginatedListing> {
    const realLimit = Math.min(limit, 50);
    const limitPlusOne = realLimit + 1;
    let where: Record<string, any> = {};
    if (category) {
      where.category = category;
    }
    if (city) {
      where.city = city;
    }
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    let listings;
    if (cursor) {
      listings = await prisma.listing.findMany({
        cursor: {
          id: cursor,
        },
        where,
        skip: 1,
        take: limitPlusOne,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      listings = await prisma.listing.findMany({
        take: limitPlusOne,
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return {
      hasMore: listings.length === limitPlusOne,
      listings: listings.slice(0, realLimit),
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteListing(
    @Arg('listingId', () => Int) listingId: number,
    @Ctx() { req, prisma }: MyContext
  ): Promise<boolean> {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });
    if (!listing) {
      throw new CustomError('Not Found', '404');
    }
    if (listing.userId !== req.session.userId) {
      throw new CustomError('Not Authorized', '401');
    }
    await prisma.listing.delete({
      where: {
        id: listingId,
      },
    });
    return true;
  }

  @Query(() => ListingResponse)
  async listing(
    @Arg('listingId', () => Int) listingId: number,
    @Ctx() { prisma, req }: MyContext
  ): Promise<ListingResponse> {
    const listing = (await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })) as Listing;
    return {
      currentUserListing: req.session.userId === listing?.userId,
      listing,
    };
  }

  @Query(() => [Listing])
  userListings(
    @Arg('userId', () => Int) userId: number,
    @Ctx() { prisma }: MyContext
  ): Promise<Listing[]> {
    return prisma.listing.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
