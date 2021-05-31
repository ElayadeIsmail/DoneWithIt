import { useRouter } from 'next/router';
import { useListingQuery } from '../generated/graphql';
import { intId } from './IntId';

export const getListingFromUrl = () => {
  const router = useRouter();
  const id = intId(router.query.id!);
  return useListingQuery({
    skip: id === -1,
    variables: {
      listingId: id,
    },
  });
};
