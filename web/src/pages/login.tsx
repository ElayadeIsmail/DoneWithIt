import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});

interface IFormValues {
  email: string;
  password: string;
}

const login: React.FC = () => {
  const router = useRouter();
  const [loginMutation, { loading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormValues) => {
    const res = await loginMutation({
      variables: data,
      update: (cache, { data: loginData }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: loginData?.login.user,
          },
        });
      },
    });
    if (res.data?.login.errors) {
      toast.error(res.data?.login.errors[0].message);
    } else if (res.data?.login.user) {
      if (typeof router.query.next === 'string') {
        router.push(router.query.next);
      } else {
        router.push('/listings');
      }
    }
  };
  return (
    <Layout>
      <div className='max-w-screen-maxWidth my-0 mx-auto h-full-min-nav py-6'>
        <div className='bg-white w-1/2 py-6 px-4 shadow-lg rounded-md flex flex-col space-x-2 mx-auto '>
          <div className='mx-auto'>
            <Image src='/assets/logo-red.png' width={70} height={70} />
          </div>
          <h1 className='text-center my-2 text-3xl font-semibold text-gray-700'>
            Login
          </h1>
          <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <InputField
              placeholder='Email'
              name='email'
              register={register}
              error={errors.email?.message || null}
            />
            <InputField
              placeholder='Password'
              type='password'
              name='password'
              register={register}
              error={errors.password?.message || null}
            />
            <Button disabled={loading} width='w-full' type='submit'>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          <DevTool control={control} />
          <Link href='/forgot-password'>
            <a className='block text-center font-semibold mt-1 text-gray-800 hover:underline'>
              Forget Password?
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(login);
