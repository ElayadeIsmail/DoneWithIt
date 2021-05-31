import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  width = '',

  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${width} rounded-md border border-red-600 bg-red-600 text-white font-semibold py-3 px-2 outline-none focus:outline-none disabled:opacity-50 focus:border-red-600 focus:ring-1 focus:ring-red-600`}
    >
      {children}
    </button>
  );
};
