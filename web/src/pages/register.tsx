import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(10).required(),
  lastName: yup.string().min(3).max(10).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [registerMutation, { loading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormValues) => {
    const res = await registerMutation({
      variables: {
        options: data,
      },
    });
    if (res.data?.register.errors) {
      toast.error(res.data?.register.errors[0].message);
    }
    if (res.data?.register.user) {
      toast.success('Check Your Email, To Confirm it');
      reset();
    }
  };
  return (
    <Layout>
      <div className='max-w-screen-maxWidth my-0 mx-auto h-full-min-nav py-6'>
        <div className='bg-white w-1/2 p-4 shadow-lg rounded-md flex flex-col space-x-2 mx-auto '>
          <div className='mx-auto'>
            <Image src='/assets/logo-red.png' width={70} height={70} />
          </div>
          <h1 className='text-center my-2 text-3xl font-semibold text-gray-700'>
            Register
          </h1>

          <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <InputField
              placeholder='First Name'
              name='firstName'
              register={register}
              error={errors.firstName?.message || null}
            />
            <InputField
              placeholder='Last Name'
              name='lastName'
              register={register}
              error={errors.lastName?.message || null}
            />
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
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </form>

          <DevTool control={control} />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(register);
