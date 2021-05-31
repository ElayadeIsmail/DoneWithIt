import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql';

type Inputs = {
  name: string;
};

export const NavBar: React.FC = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    if (data.name.trim() === '') {
      return;
    }
    router.push({
      pathname: '/listings',
      query: { name: data.name },
    });
    reset();
  };
  let body;
  if (!data && loading) {
    body = null;
  } else if (!data?.me && !loading) {
    body = (
      <>
        <Link href='/listings'>
          <a className='font-semibold no-underline text-red-600 rounded-md py-3 px-3 cursor-pointer focus:text-red-700'>
            Listings
          </a>
        </Link>
        <Link href='/login'>
          <a className='font-semibold no-underline text-red-600 rounded-md py-3 px-3 cursor-pointer focus:text-red-700'>
            Login
          </a>
        </Link>
        <Link href='/register'>
          <a className='mr-3 font-semibold border border-red-600 no-underline bg-red-600 text-white rounded-md p-2 cursor-pointer flex items-center justify-center'>
            Register
          </a>
        </Link>
      </>
    );
  } else if (data?.me) {
    body = (
      <>
        <Link href='/listings'>
          <a className='font-semibold no-underline text-red-600 rounded-md py-3 px-3 cursor-pointer focus:text-red-700'>
            Listings
          </a>
        </Link>
        <Link href={`/user/${data.me.id}`}>
          <a className='font-semibold no-underline text-red-600 rounded-md py-3  px-3 cursor-pointer focus:text-red-700'>
            My Listings
          </a>
        </Link>
        <button
          onClick={async () => {
            try {
              await logout({
                update: (cache) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: null,
                    },
                  });
                },
              });
              router.push('/');
            } catch (error) {
              console.log('Logout Error:', error.message);
            }
          }}
          className='mr-3 font-semibold border border-red-600 no-underline bg-red-600 text-white rounded-md p-2 focus:outline-none cursor-pointer'
        >
          Logout
        </button>
      </>
    );
  }
  return (
    <header className='bg-white w-full h-20'>
      <div className='max-w-screen-maxWidth w-full flex py-2 px-4 h-full items-center justify-between my-0 mx-auto'>
        <Link href='/'>
          <div className='cursor-pointer w-1/3'>
            <Image
              src='/assets/logo-red.png'
              width={50}
              height={50}
              className='object-contain'
            />
          </div>
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'
          className='flex  w-1/3 items-center py-1 px-4 bg-gray-100 rounded-md'
        >
          <SearchIcon className='w-6 h-6 text-gray-600' />
          <input
            type='text'
            placeholder='Search For A Listing'
            {...register('name')}
            className='flex-1 ml-2 h-full py-3 px-1 focus:outline-none bg-gray-100'
          />
          <button type='submit' className='hidden' />
        </form>
        <div className='w-1/3 flex justify-end'>{body}</div>
      </div>
    </header>
  );
};
