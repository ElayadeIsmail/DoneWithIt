import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CreateMessage } from '../../../components/CreateMessage';
import { Layout } from '../../../components/Layout';
import { Loading } from '../../../components/Loading';
import { Message } from '../../../components/Message';
import {
  NewMessageDocument,
  NewMessageSubscription,
  useMessagesQuery,
} from '../../../generated/graphql';
import { getListingFromUrl } from '../../../utils/getListingFromUrl';
import { intId } from '../../../utils/IntId';
import { isAuth } from '../../../utils/isAuth';
import { getTimeAgo } from '../../../utils/timeAgo';
import { withApollo } from '../../../utils/withApollo';

interface ListingChatProps {}

const ListingChat: React.FC<ListingChatProps> = () => {
  const [isRefetch, setIsRefetch] = useState(false);
  isAuth();
  const router = useRouter();
  const listingId = intId(router.query.id!);
  const { data, loading, error, subscribeToMore, refetch } = useMessagesQuery({
    skip: listingId === -1,
    variables: {
      listingId,
    },
  });
  const { data: listingData, loading: listingLoading } = getListingFromUrl();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!isRefetch && data) {
      refetch({
        listingId,
      });
    }
    setIsRefetch(true);
    try {
      const more = () =>
        subscribeToMore<NewMessageSubscription>({
          document: NewMessageDocument,
          onError: (error) => console.log('sub err', error),
          variables: {
            listingId,
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.newMessage;
            return Object.assign({}, prev, {
              messages: [newMessage, ...prev.messages],
            });
          },
        });
      more();
    } catch (error) {
      console.log('====================================');
      console.log('sub err:', error);
      console.log('====================================');
    }
  }, [router]);

  if (error) {
    return (
      <Layout>
        <div>{error.message}</div>
      </Layout>
    );
  }
  if (loading || !router.isReady) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <div>Oooops</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className='max-w-screen-maxWidth mx-auto h-full-min-nav overflow-hidden'>
        <div className='flex'>
          {listingLoading ? (
            <Loading />
          ) : (
            listingData?.listing.listing && (
              <div className='flex flex-col w-1/3 p-4 h-full-min-nav bg-gray-200 space-y-2 rounded-md items-center'>
                <h1 className='font-bold text-4xl text-red-500'>
                  {listingData?.listing.listing?.name}
                </h1>
                <div className='relative w-full h-80'>
                  <Image
                    src={listingData?.listing.listing?.imageUrl!}
                    layout='fill'
                    objectFit='contain'
                    className='rounded-lg'
                  />
                </div>

                <h1 className='font-bold text-4xl text-red-500'>
                  ${listingData?.listing.listing?.price}
                </h1>
                <p className='text-gray-500 text-center'>
                  {listingData?.listing.listing?.description}
                </p>
                <div className='flex align-middle'>
                  <Image
                    width={50}
                    height={50}
                    className='rounded-full'
                    src={listingData?.listing.listing?.user.avatar!}
                    alt={listingData?.listing.listing?.user.name}
                  />
                  <div className='pl-2'>
                    <h5 className='text-red-500 font-medium text-lg'>
                      {listingData?.listing.listing?.user.name}
                    </h5>
                    <p className='text-sm text-gray-500'>
                      {getTimeAgo(listingData?.listing.listing?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
          <div className='flex w-full p-2 h-full-min-nav border-red-500 border-l-4 flex-col'>
            <div className='h-5/6 flex flex-col-reverse overflow-y-scroll'>
              {data.messages.map((message) => (
                <Message message={message} key={message.id} />
              ))}
            </div>
            <div className='h-1/6 p-2 flex items-center bg-gray-200'>
              <CreateMessage listingId={listingId} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ListingChat);
