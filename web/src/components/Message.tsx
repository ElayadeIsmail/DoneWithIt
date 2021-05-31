import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RegularMessageFragment, useMeQuery } from '../generated/graphql';

interface MessageProps {
  message: RegularMessageFragment;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <div></div>;
  }
  if (data?.me?.id === message.user.id) {
    return (
      <div className='self-end max-w flex items-center bg-rouge rounded-md text-white p-2 mb-2'>
        <p className='leading-6'>{message.text}</p>
      </div>
    );
  }
  return (
    <div className='flex'>
      <Link href={`/user/${message.user.id}`}>
        <div className='mr-2 cursor-pointer'>
          <Image
            src={message.user.avatar}
            width={50}
            height={50}
            objectFit='cover'
            className='rounded-full'
          />
        </div>
      </Link>

      <div className='max-w flex items-center bg-gray-600 rounded-md text-white p-2 mb-2'>
        <p className='leading-6'>{message.text}</p>
      </div>
    </div>
  );
};
