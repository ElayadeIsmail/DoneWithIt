/* This example requires Tailwind CSS v2.0+ */

export default function Pagination() {
  return (
    <div className='flex text-gray-700'>
      <div className='h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-chevron-left w-6 h-6'
        >
          <polyline points='15 18 9 12 15 6'></polyline>
        </svg>
      </div>
      <div className='flex h-12 font-medium rounded-full bg-gray-200'>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  '>
          1
        </div>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-rouge text-white '>
          2
        </div>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  '>
          3
        </div>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  '>
          ...
        </div>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  '>
          13
        </div>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  '>
          14
        </div>
        <div className='w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  '>
          15
        </div>
      </div>
      <div className='h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-chevron-right w-6 h-6'
        >
          <polyline points='9 18 15 12 9 6'></polyline>
        </svg>
      </div>
    </div>
  );
}
