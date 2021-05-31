import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RegularListingFragment } from '../generated/graphql';

interface ListingProps {
  listing: RegularListingFragment;
}

export const ListingComponent: React.FC<ListingProps> = ({ listing }) => {
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className='relative bg-white flex flex-col h-88 rounded-2xl cursor-pointer'>
        <div className='w-full rounded-2xl h-9/10 relative'>
          <Image
            src={listing.imageUrl}
            layout='fill'
            alt={listing.name}
            objectPosition='center center'
            objectFit='scale-down'
            className='rounded-2xl rounded-b-none'
          />
        </div>
        <div className='h-1/10 text-base flex items-center justify-between bg-white rounded-2xl rounded-t-none p-2'>
          <span className='w-11/12 text-gray-700 font-semibold'>
            {listing.name}
          </span>
          <span className='text-right flex-1 text-red-600 font-semibold'>
            ${listing.price}
          </span>
        </div>
      </div>
    </Link>
  );
};
