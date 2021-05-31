import Image from 'next/image';
import { useState } from 'react';
import { CategoryItem } from '../components/CategoryItem';
import { Layout } from '../components/Layout';
import { categoriesData, Role } from '../utils/constants';
import { withApollo } from '../utils/withApollo';

function Home() {
  const [role, setRole] = useState<Role>(Role.SELLER);
  return (
    <Layout>
      <div className='relative w-full flex flex-col'>
        <div className='grid grid-cols-2 gap-4 px-0 py-4 max-w-screen-maxWidth my-0 mx-auto h-full-min-nav'>
          <div className='flex flex-col space-y-6'>
            <h1 className='leading-12 text-red-600 font-bold text-5xl my-8'>
              Buy, Sell, And discover fashion, Home decor, Beauty, and more
            </h1>
            <p className='leading-7 font-semibold text-gray-700 text-xl'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              molestias, quidem, quis cupiditate minus nam nostrum voluptas
              dolor laudantium velit ullam pariatur reprehenderit voluptates?
              Ipsa quasi eius vero saepe facere?
            </p>
          </div>
          <div className='relative flex items-start'>
            <Image
              src='/assets/hero_first.jpg'
              width={350}
              height={400}
              alt='hero'
              objectFit='cover'
            />
            <div className='absolute p-1 bg-white top-7/10 left-4/10 rounded'>
              <Image
                src='/assets/hero_second.jpg'
                width={350}
                height={350}
                alt='hero-2'
                objectFit='cover'
              />
            </div>
          </div>
        </div>
        <div className='bg-gray-100'>
          <div className='max-w-screen-maxWidth my-0 mx-auto py-8 px-0 flex flex-col'>
            <h1 className='text-4xl font-bold uppercase text-red-600 mx-auto my-14'>
              Categories
            </h1>
            <div className='grid grid-cols-3 gap-4'>
              {categoriesData.map((item) => (
                <CategoryItem
                  key={item.image}
                  name={item.name}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='max-w-screen-maxWidth my-0 mx-auto py-8 px-0 flex flex-col'>
          <h1 className='text-4xl font-bold uppercase text-red-600 mx-auto my-14'>
            How it works
          </h1>
          <div className='flex flex-col'>
            <ul className='flex items-center justify-center font-semibold text-2xl'>
              <li
                onClick={() => setRole(Role.SELLER)}
                className={`flex flex-col items-center mr-8 list-none cursor-pointer transition-colors  ${
                  role === Role.SELLER ? 'text-red-600' : ''
                }`}
              >
                Seller
                <span
                  className={`h-1 bg-red-600 transition-all ${
                    role === Role.SELLER ? 'w-full' : 'w-0'
                  }`}
                ></span>
              </li>
              <li
                onClick={() => setRole(Role.BUYER)}
                className={`flex flex-col items-center mr-8 list-none cursor-pointer transition-colors  ${
                  role === Role.BUYER ? 'text-red-600' : ''
                }`}
              >
                Buyer
                <span
                  className={`h-1 bg-red-600 transition-all ${
                    role === Role.BUYER ? 'w-full' : 'w-0'
                  }`}
                ></span>
              </li>
            </ul>
            {role === Role.SELLER ? (
              <div className='flex w-full my-8 mx-auto'>
                <div className='flex-1 mr-12'>
                  <Image src='/assets/seller.jpg' width={450} height={300} />
                </div>
                <div className='flex flex-col w-96 flex-1 space-y-4 mt-4'>
                  <div className='flex flex-col'>
                    <span className='font-bold uppercase text-xl'>LIST IT</span>
                    <p className='text-gray-700'>
                      Take a photo and upload to your listings in less than 60
                      seconds–right!
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-bold uppercase text-xl'>
                      SHARE IT
                    </span>
                    <p className='text-gray-700'>
                      Share listings to your network for shoppers to discover!
                      More sharing = more sales.
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-bold uppercase text-xl'>
                      EARN CASH
                    </span>
                    <p className='text-gray-700'>
                      Wait for buyers to connect with you
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-row-reverse w-full my-8 mx-auto'>
                <div className='flex-1 ml-12'>
                  <Image src='/assets/buyer.jpg' width={450} height={300} />
                </div>
                <div className='flex flex-col w-96 flex-1 space-y-4 mt-4'>
                  <div className='flex flex-col'>
                    <span className='font-bold uppercase text-xl'>
                      DISCOVER ITEMS
                    </span>
                    <p className='text-gray-700'>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas velit fugit!
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-bold uppercase text-xl'>
                      GET STYLED
                    </span>
                    <p className='text-gray-700'>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique eos at quidem fugia?.
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-bold uppercase text-xl'>
                      Contact The Seller
                    </span>
                    <p className='text-gray-700'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iusto, maxime incidunt.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='bg-gray-100'>
          <div className='max-w-screen-maxWidth my-0 mx-auto py-8 px-0 flex flex-col'>
            <h1 className='text-4xl font-bold uppercase text-red-600 mx-auto my-14'>
              We've got your back
            </h1>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col items-center space-y-3'>
                <Image src='/assets/badge.svg' width={50} height={50} />
                <h1 className='text-red-600 font-bold uppercase'>
                  FREE AUTHENTICATION
                </h1>
                <p className='text-gray-700 text-center'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  excepturi neque suscipit unde explicabo facilis!
                </p>
              </div>
              <div className='flex flex-col items-center space-y-3'>
                <Image src='/assets/chat.svg' width={50} height={50} />
                <h1 className='text-red-600 font-bold uppercase'>Live chat</h1>
                <p className='text-gray-700 text-center'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  excepturi neque suscipit unde explicabo facilis!
                </p>
              </div>
              <div className='flex flex-col items-center space-y-3'>
                <Image src='/assets/check.svg' width={50} height={50} />
                <h1 className='text-red-600 font-bold uppercase'>
                  Verified Users
                </h1>
                <p className='text-gray-700 text-center'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  excepturi neque suscipit unde explicabo facilis!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withApollo({ ssr: true })(Home);
