import React from 'react';

export const Spinner = () => {
  return (
    <div
      style={{ borderTopColor: '#ff0000' }}
      className='animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16'
    ></div>
  );
};
