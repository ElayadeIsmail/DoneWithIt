import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import Select from '../components/Select';
import { TextArea } from '../components/TextArea';
import { UploadImage } from '../components/UploadImage';
import {
  Categories,
  useCreateListingMutation,
  useMeQuery,
  UserListingsDocument,
  UserListingsQuery,
} from '../generated/graphql';
import { categories, cities } from '../utils/constants';
import { isAuth } from '../utils/isAuth';
import { createListingFormValues } from '../utils/types';
import { uploadFile } from '../utils/uploadImage';
import { withApollo } from '../utils/withApollo';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().min(0).required().typeError('price must be a number'),
  image: yup.mixed().required(),
  city: yup.string().required(),
  description: yup.string().required(),
  category: yup.mixed<Categories>().oneOf(Object.values(Categories)).required(),
});

const createListing: React.FC = () => {
  const { data: meData } = useMeQuery();
  const router = useRouter();
  const [createListingMutation] = useCreateListingMutation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<createListingFormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: createListingFormValues) => {
    try {
      const url = await uploadFile(data.image, (p) => console.log(p));
      let { image, ...inputs } = data;
      await createListingMutation({
        variables: {
          inputs: {
            ...inputs,
            imageUrl: url,
          },
        },
        update: (cache, { data }) => {
          const userListing = cache.readQuery<UserListingsQuery>({
            query: UserListingsDocument,
            variables: {
              userId: meData?.me?.id,
            },
          });
          if (userListing && data?.createListing) {
            cache.writeQuery<UserListingsQuery>({
              query: UserListingsDocument,
              data: {
                __typename: 'Query',
                userListings: [
                  data?.createListing,
                  ...userListing.userListings,
                ],
              },
              variables: {
                userId: meData?.me?.id,
              },
            });
          }
          cache.evict({ fieldName: 'listings:{}' });
        },
      });
      router.push('/listings');
      toast.success('Your Listing Was Created Successfully');
    } catch (error) {
      toast.error(error.message);
      router.push('/login');
    }
  };

  isAuth();

  return (
    <Layout>
      <div className='max-w-screen-maxWidth my-0 mx-auto min-h-full-min-nav'>
        <div className='bg-white w-1/2 py-6 px-4 shadow-lg rounded-md flex flex-col space-x-2 mx-auto '>
          <h1 className='text-center my-2 text-3xl font-semibold text-gray-700'>
            Add Listing
          </h1>
          <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <UploadImage
              error={errors.image || null}
              setValue={setValue}
              clearErrors={clearErrors}
            />
            <InputField
              placeholder='Name'
              name='name'
              register={register}
              error={errors.name?.message || null}
            />
            <InputField
              placeholder='Price'
              type='number'
              name='price'
              register={register}
              error={errors.price?.message || null}
            />
            <Select
              items={cities}
              title='City'
              setValue={setValue}
              clearErrors={clearErrors}
              name='city'
              getValues={getValues}
              error={errors.city?.message || null}
            />
            <Select
              items={categories}
              title='Category'
              setValue={setValue}
              clearErrors={clearErrors}
              getValues={getValues}
              name='category'
              error={errors.category?.message || null}
            />

            <TextArea
              placeholder='Description'
              name='description'
              register={register}
              error={errors.description?.message || null}
            />
            <Button disabled={isSubmitting} width='w-full' type='submit'>
              {isSubmitting ? 'Loading...' : 'Add Listing'}
            </Button>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(createListing);
