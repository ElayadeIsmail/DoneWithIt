import { CameraIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Layout } from '../../components/Layout';
import { ListingComponent } from '../../components/Listing';
import { Loading } from '../../components/Loading';
import { Spinner } from '../../components/Spinner';
import {
  MeDocument,
  MeQuery,
  useUpdateUserMutation,
  useUserListingsQuery,
  useUserQuery,
} from '../../generated/graphql';
import { intId } from '../../utils/IntId';
import { uploadFile } from '../../utils/uploadImage';
import { withApollo } from '../../utils/withApollo';

interface UserListingsProps {}

const UserListings: React.FC<UserListingsProps> = ({}) => {
  const router = useRouter();
  const id = intId(router.query.id!);
  const { data, loading: userQueryLoading, error } = useUserQuery({
    skip: id === -1,
    variables: {
      userId: id,
    },
  });
  const {
    data: userListingData,
    loading: userListingLoading,
  } = useUserListingsQuery({
    skip: id === -1,
    variables: {
      userId: id,
    },
  });
  const [loading, setLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setLoading(true);
    try {
      const url = await uploadFile(e.target.files[0], (e) => console.log(e));
      await updateUser({
        variables: {
          avatar: url,
        },
        update: (cache, { data: updateData }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: updateData?.updateUser,
            },
          });
        },
      });
      toast.success('Your profile Updated Successfully');
      setLoading(false);
    } catch (error) {
      toast.error('Ooops Something Went Wrong');
      setLoading(false);
    }
  };
  if (error) {
    return (
      <Layout>
        <div className='max-w-screen-maxWidth my-0 mx-auto min-h-full-min-nav flex items-center justify-center'>
          <p>{error.message}</p>
        </div>
      </Layout>
    );
  }
  if (userQueryLoading || !router.isReady) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  if (!data?.user) {
    return (
      <Layout>
        <div className='max-w-screen-maxWidth my-0 mx-auto min-h-full-min-nav flex items-center justify-center'>
          <p>oops Something Went Wrong</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className='relative'>
        <div className='p-0 max-w-screen-maxWidth my-0 mx-auto min-h-full-min-nav flex flex-col space-y-2'>
          <div className='rounded-full mx-auto w-52 h-52 border-4 border-black relative bg-white'>
            <Image
              src={data?.user.user?.avatar!}
              layout='fill'
              className='rounded-full object-cover'
            />
            {data?.user.currentUser && (
              <label
                className={`absolute bottom-10 -right-2 w-9 h-9 bg-gray-600 rounded-full flex items-center justify-center ${
                  loading
                    ? 'opacity-25 cursor-not-allowed'
                    : 'opacity-100 cursor-pointer'
                }`}
              >
                <input
                  onChange={handleChange}
                  className='w-0 h-0 opacity-0'
                  type='file'
                  disabled={loading}
                />
                <CameraIcon className='text-white w-5 h-5' />
              </label>
            )}
          </div>
          <h1 className='text-center font-semibold uppercase text-gray-600 text-2xl'>
            {data?.user.user?.name}
          </h1>
          <div className='w-full h-0.5 bg-gray-300'></div>
          <div className='flex flex-col pt-4 space-y-3'>
            <h1 className='text-center text-gray-800 text-5xl font-semibold'>
              {data?.user.currentUser
                ? 'My Listings'
                : `${data?.user.user?.firstName}'s Listings`}
            </h1>
            {data?.user.currentUser && (
              <Link href='/create-listing'>
                <a className='self-center w-8 h-8 rounded-full bg-rouge p-1 flex items-center justify-center text-white font-bold '>
                  <PlusIcon className='text-white' />
                </a>
              </Link>
            )}
          </div>
          <div className='py-8'>
            {userListingLoading ? (
              <div className='flex items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <div className='grid grid-cols-4 gap-4'>
                {userListingData?.userListings.map((listing) => (
                  <ListingComponent key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(UserListings);
