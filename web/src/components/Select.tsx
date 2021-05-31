import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import React, { Fragment, useState } from 'react';
import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { classNames } from '../utils/helpert';
import { createListingFormValues } from '../utils/types';

interface SelectProps {
  items: string[];
  title: string;
  setValue: UseFormSetValue<createListingFormValues>;
  name: 'category' | 'city';
  error: string | null;
  clearErrors: UseFormClearErrors<createListingFormValues>;
  getValues: UseFormGetValues<createListingFormValues>;
}

const Select: React.FC<SelectProps> = ({
  items,
  title,
  setValue,
  name,
  error,
  clearErrors,
  getValues,
}) => {
  const [selected, setSelected] = useState(getValues(name) || title);

  const handleChange = (value: string) => {
    setSelected(value);
    setValue(name, value);
    clearErrors(name);
  };
  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className='mt-1 relative'>
            <Listbox.Button
              className={classNames(
                !error
                  ? 'border-gray-300 focus:border-gray-700 relative w-full bg-white border p-3 px-4 rounded-lg shadow-sm text-left cursor-default focus:outline-none  sm:text-sm'
                  : 'border-red-500 relative w-full bg-white border  p-3 px-4 rounded-lg shadow-sm text-left cursor-default focus:outline-none focus:border-gray-500 sm:text-sm'
              )}
            >
              <span
                className={classNames(
                  selected === title
                    ? "'flex  p-1 font-medium items-center text-gray-400 text-base "
                    : 'flex  p-1 font-medium text-base items-center'
                )}
              >
                {selected}
              </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            {error && (
              <span className='block text-sm mt-1 text-red-600'>{error}</span>
            )}
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                static
                className={`absolute ${
                  error ? '-mt-5' : ''
                }  w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-10`}
              >
                {items.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-rouge' : 'text-gray-900',
                        'cursor-default select-none relative p-3 px-4'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {item}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-gray-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
