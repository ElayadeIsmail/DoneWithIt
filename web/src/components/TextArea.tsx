import React, { TextareaHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  register: UseFormRegister<any>;
  error: string | null;
  name: string;
};

export const TextArea: React.FC<TextAreaProps> = ({
  error,
  name,
  register,
  ...rest
}) => {
  return (
    <div className='my-2 w-full'>
      <textarea
        {...rest}
        {...register(name)}
        className={`w-full border ${
          !error ? 'border-gray-300 focus:border-gray-700' : 'border-red-500'
        }  p-3 px-4 rounded-lg shadow-sm focus:outline-none
        `}
        rows={3}
      />
      {error && (
        <span className='block text-sm mt-1 text-red-600'>{error}</span>
      )}
    </div>
  );
};
