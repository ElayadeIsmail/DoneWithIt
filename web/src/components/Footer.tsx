import Image from 'next/image';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className='bg-rouge'>
      <div className='max-w-screen-maxWidth my-0 mx-auto py-8 px-0 flex justify-between'>
        <div>
          <Image src='/assets/logo.png' width={100} height={100} />
        </div>
        <div>
          <ul className='space-y-4 text-white text-lg'>
            <li className='cursor-pointer hover:text-gray-300'>Home</li>
            <li className='cursor-pointer hover:text-gray-300'>Careers</li>
            <li className='cursor-pointer hover:text-gray-300'>Blog</li>
            <li className='cursor-pointer hover:text-gray-300'>About</li>
          </ul>
        </div>
        <div>
          <ul className='space-y-4 text-white text-lg'>
            <li className='cursor-pointer hover:text-gray-300'>Term of use</li>
            <li className='cursor-pointer hover:text-gray-300'>
              Shipping & return
            </li>
            <li className='cursor-pointer hover:text-gray-300'>
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className='space-y-4 text-white text-lg'>
          <h5>Stay In Touch </h5>
          <div className='flex items-start'>
            <p className='mr-3 cursor-pointer'>
              <Image src='/assets/instagram.svg' width={25} height={25} />
            </p>
            <Image src='/assets/facebook.svg' width={25} height={25} />
          </div>
        </div>
      </div>
      <footer className='bg-black p-4 text-white'>
        <div className='max-w-screen-maxWidth mx-auto text-center'>
          &copy; 2021 <strong>ELAYADE</strong>, All rights reserved.
        </div>
      </footer>
    </div>
  );
};
