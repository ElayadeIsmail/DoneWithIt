import { ArrowLeftIcon } from '@heroicons/react/outline';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import { useDeleteListingMutation, useMeQuery } from '../../generated/graphql';
import { getListingFromUrl } from '../../utils/getListingFromUrl';
import { getTimeAgo } from '../../utils/timeAgo';
import { withApollo } from '../../utils/withApollo';

interface ListingProps {}

const Listing: React.FC<ListingProps> = ({}) => {
  const { data: meData } = useMeQuery();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, loading, error } = getListingFromUrl();
  const [
    deleteListingMutation,
    { loading: deleteLoading },
  ] = useDeleteListingMutation();
  const deleteListing = async () => {
    try {
      await deleteListingMutation({
        variables: {
          listingId: data?.listing.listing?.id!,
        },
        update: (cache) => {
          cache.evict({ id: `Listing:${data?.listing.listing?.id}` });
        },
      });
      setOpen(false);
      router.push('/listings');
      toast.success('Your Listing Was Deleted Successfully');
    } catch (error) {
      toast.error('Oops Something Wont Wrong');
      setOpen(false);
      console.log('error:', error.message);
    }
  };
  if (error) {
    return (
      <Layout>
        <div className='h-full-min-nav max-w-screen-maxWidth flex items-center justify-center'>
          <p>{error.message}</p>
        </div>
      </Layout>
    );
  }
  if (loading || !router.isReady || deleteLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  if (!data?.listing && router.isReady) {
    return (
      <Layout>
        <div className='h-full-min-nav max-w-screen-maxWidth flex items-center justify-center'>
          <p>Ooops Something Went Wrong</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className='min-h-full-min-nav relative max-w-screen-maxWidth mx-auto flex items-center justify-center'>
        <div
          onClick={() => router.back()}
          className='absolute left-0 top-10 p-2 w-12 h-12 cursor-pointer rounded-full shadow-lg hover:bg-gray-300 flex items-center justify-center'
        >
          <ArrowLeftIcon className='h-8 w-8 text-rouge' />
        </div>
        <section className='my-4 h-80 mx-auto flex w-5/6'>
          <div className='w-1/2 h-full relative'>
            <Image
              src={data?.listing.listing?.imageUrl!}
              layout='fill'
              objectPosition='center center'
              alt={data?.listing.listing?.name}
              objectFit='contain'
            />
          </div>
          <div className='w-1/2 border-red-500 border-l-4 h-full flex flex-col p-4 space-y-5 '>
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-4xl text-red-500'>
                {data?.listing.listing?.name}
              </h1>
              {data?.listing.currentUserListing && (
                <Link
                  href={
                    meData?.me
                      ? `/listings/chat/${data?.listing.listing?.id}`
                      : '/login'
                  }
                >
                  <a className='bg-red-500 px-6 py-2 rounded-md text-xl font-medium flex items-center justify-center text-white'>
                    Message
                  </a>
                </Link>
              )}
            </div>
            <div className='flex justify'>
              <p className='text-md font-medium text-gray-900'>
                {data?.listing.listing?.category},{' '}
              </p>
              <div className='flex justify-center align-middle'>
                <div className='pt-0.5'>
                  <LocationMarkerIcon className='w-4 h-4' />
                </div>
                <p className='text-md font-medium text-gray-900'>
                  {data?.listing.listing?.city}
                </p>
              </div>
            </div>
            <h1 className='my-5 font-bold text-4xl text-red-500'>
              ${data?.listing.listing?.price}
            </h1>
            <p className='text-gray-500'>
              {' '}
              {data?.listing.listing?.description}
            </p>
            <div className=' flex justify-between align-middle max-w-xl '>
              {data?.listing.currentUserListing ? (
                <div className='flex justify-between align-middle w-full'>
                  <Link href={`/listings/edit/${data?.listing.listing?.id}`}>
                    <a className='bg-gray-200 px-6 py-2 rounded-md text-xl font-medium flex items-center justify-center text-red-600'>
                      Edit
                    </a>
                  </Link>

                  <Button onClick={() => setOpen(true)}>Delete</Button>
                </div>
              ) : (
                <div className='flex justify-between align-middle w-full'>
                  <Link href={`/listings/chat/${data?.listing.listing?.id}`}>
                    <a className='bg-red-500 px-6 py-2 rounded-md text-xl font-medium flex items-center justify-center text-white'>
                      Message
                    </a>
                  </Link>
                  <div className='flex align-middle'>
                    <Image
                      width={50}
                      height={50}
                      className='rounded-full'
                      src={data?.listing.listing?.user.avatar!}
                      alt={data?.listing.listing?.user.name}
                    />
                    <div className='pl-2'>
                      <h5 className='text-red-500 font-medium text-lg'>
                        {data?.listing.listing?.user.name}
                      </h5>
                      <p className='text-sm text-gray-500'>
                        {getTimeAgo(data?.listing.listing?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Modal
        disabled={deleteLoading}
        open={open}
        deleteListing={deleteListing}
        setOpen={setOpen}
      />
    </Layout>
  );
};

export default withApollo({ ssr: false })(Listing);
