import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter';
import { Layout } from '../../components/Layout';
import { ListingComponent } from '../../components/Listing';
import { Loading } from '../../components/Loading';
import { useListingsQuery } from '../../generated/graphql';
import { categories, cities, LIMIT } from '../../utils/constants';
import { withApollo } from '../../utils/withApollo';

interface listingsProps {}

const listings: React.FC<listingsProps> = ({}) => {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const { data, loading, error, fetchMore, refetch } = useListingsQuery({
    variables: {
      limit: LIMIT,
      name: typeof router.query.name === 'string' ? router.query.name : null,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!city && !categories) {
      return;
    }
    refetch({
      limit: LIMIT,
      cursor: null,
      category,
      city,
      name: typeof router.query.name === 'string' ? router.query.name : null,
    });
  }, [city, category, router.query]);

  if (error) {
    return (
      <Layout>
        <div className='bg-gray-200 flex items-center justify-center h-full-min-nav'>
          <p>Error:{error.message}...</p>
        </div>
      </Layout>
    );
  }

  if (!data?.listings && loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className='bg-gray-200 py-6'>
        <div className='flex flex-col py-4 max-w-screen-maxWidth mx-auto'>
          <div className='flex items-center mb-5'>
            {typeof router.query.name === 'string' && (
              <h2 className='font-semibold text-gray-700 text-xl'>
                Search result for{' '}
                <span className='text-red-600'>" {router.query.name} "</span>
              </h2>
            )}
            <div className='flex flex-1 justify-end items-center'>
              <span className='text-rouge font-semibold'>Filter By</span>
              <Filter
                title='City'
                setValue={setCity}
                items={['All', ...cities]}
              />
              <Filter
                title='Category'
                setValue={setCategory}
                items={['All', ...categories]}
              />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {data?.listings.listings.map((listing) => (
              <ListingComponent key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
        {data?.listings.hasMore && (
          <div className='flex items-center justify-center '>
            <Button
              disabled={loading}
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: LIMIT,
                    cursor:
                      data?.listings.listings[
                        data?.listings.listings.length - 1
                      ].id,
                  },
                });
              }}
            >
              {loading ? 'Loading..' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(listings);
