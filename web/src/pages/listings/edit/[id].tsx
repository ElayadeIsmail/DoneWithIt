import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { Loading } from '../../../components/Loading';
import Select from '../../../components/Select';
import { TextArea } from '../../../components/TextArea';
import { UploadImage } from '../../../components/UploadImage';
import {
  Categories,
  useUpdateListingMutation,
} from '../../../generated/graphql';
import { categories, cities } from '../../../utils/constants';
import { getListingFromUrl } from '../../../utils/getListingFromUrl';
import { isAuth } from '../../../utils/isAuth';
import { createListingFormValues } from '../../../utils/types';
import { uploadFile } from '../../../utils/uploadImage';
import { withApollo } from '../../../utils/withApollo';

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().min(0).required().typeError('price must be a number'),
  image: yup.mixed(),
  city: yup.string().required(),
  description: yup.string().required(),
  category: yup.mixed<Categories>().oneOf(Object.values(Categories)).required(),
});

interface EditListingProps {}

const EditListing: React.FC<EditListingProps> = ({}) => {
  const router = useRouter();
  const [updateListing] = useUpdateListingMutation();
  const { data, loading, error } = getListingFromUrl();
  isAuth();
  if (error) {
    return (
      <Layout>
        <div className='h-full-min-nav max-w-screen-maxWidth flex items-center justify-center'>
          <p>{error.message}</p>
        </div>
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
  if (!data?.listing && router.isReady) {
    return (
      <Layout>
        <div className='h-full-min-nav max-w-screen-maxWidth flex items-center justify-center'>
          <p>Ooops Something Went Wrong</p>
        </div>
      </Layout>
    );
  }

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
    defaultValues: {
      name: data?.listing.listing?.name,
      price: data?.listing.listing?.price,
      city: data?.listing.listing?.city,
      description: data?.listing.listing?.description,
      category: data?.listing.listing?.category,
    },
  });
  const onSubmit = async (inputData: createListingFormValues) => {
    try {
      let imageUrl = data?.listing.listing?.imageUrl!;
      if (inputData.image) {
        const url = await uploadFile(inputData.image, (p) => console.log(p));
        imageUrl = url;
      }
      let { image, ...inputs } = inputData;
      await updateListing({
        variables: {
          listingId: data?.listing.listing?.id!,
          inputs: {
            ...inputs,
            imageUrl,
          },
        },
      });
      toast.success('Your Listing Was Updated Successfully');
      router.push('/listings');
    } catch (error) {
      console.log(error.message);
      toast.error('Ooops Something Went Wrong');
    }
  };
  return (
    <Layout>
      <div className='max-w-screen-maxWidth my-0 mx-auto min-h-full-min-nav'>
        <div className='bg-white w-1/2 py-6 px-4 shadow-lg rounded-md flex flex-col space-x-2 mx-auto '>
          <h1 className='text-center my-2 text-3xl font-semibold text-gray-700'>
            Edit Listing
          </h1>
          <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <UploadImage
              error={errors.image || null}
              setValue={setValue}
              clearErrors={clearErrors}
              defaultValue={`${data?.listing.listing?.name}.jpg`}
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
              getValues={getValues}
              clearErrors={clearErrors}
              name='city'
              error={errors.city?.message || null}
            />
            <Select
              items={categories}
              getValues={getValues}
              title='Category'
              setValue={setValue}
              clearErrors={clearErrors}
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
              {isSubmitting ? 'Loading...' : 'Edit Listing'}
            </Button>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditListing);
