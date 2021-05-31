import React, { ChangeEvent, useState } from 'react';
import {
  DeepMap,
  FieldError,
  UseFormClearErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { createListingFormValues } from '../utils/types';

interface UploadImageProps {
  setValue: UseFormSetValue<createListingFormValues>;
  error: DeepMap<File, FieldError> | null;
  clearErrors: UseFormClearErrors<createListingFormValues>;
  defaultValue?: string;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  error,
  setValue,
  defaultValue,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let selected = e.target.files[0];
    setFile(selected);
    setValue('image', selected);
  };

  return (
    <div className='my-2 w-full'>
      <div
        className={`w-full border flex items-stretch ${
          !error ? 'border-gray-300' : 'border-red-500'
        } rounded-lg shadow-sm focus:outline-none
        `}
      >
        <div className='w-1/3  p-3 px-4  bg-red-600 rounded-lg flex items-stretch h-full text-white cursor-pointer justify-center text-center relative'>
          <input
            type='file'
            className='absolute -inset-0 w-full z-10 h-full opacity-0'
            onChange={handleChange}
            accept='image/*'
          />
          Upload Image
        </div>
        <div className='w-full h-full rounded-l-none rounded-r-lg  flex items-center p-3 px-4 justify-center'>
          <span className='text-gray-700'>
            {file?.name?.slice(0, 40) || defaultValue || ''}
          </span>
        </div>
      </div>
      {error && (
        <span className='block text-sm mt-1 text-red-600'>
          image is required
        </span>
      )}
    </div>
  );
};
