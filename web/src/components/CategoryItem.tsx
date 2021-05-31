import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryItemProps {
  name: string;
  image: string;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ name, image }) => {
  return (
    <div className='relative w-96 h-96 flex items-center justify-center mb-4 cursor-pointer'>
      <div className='absolute inset-0 w-96 h-96 bg-black bg-opacity-30 z-10'></div>
      <Link href='/'>
        <div>
          <Image src={image} layout='fill' />
          <p className='absolute top-1/2 left-1/2 z-20 flex flex-col py-4 px-6 bg-gray-100 transform -translate-x-1/2 -translate-y-1/2 uppercase'>
            <span className='mb-1 text-red-600 font-semibold'>{name}</span>
            <span className='text-center text-gray-800'>Explore</span>
          </p>
        </div>
      </Link>
    </div>
  );
};
