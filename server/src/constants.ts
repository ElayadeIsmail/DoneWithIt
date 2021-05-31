import { Categories } from './models/Listing';

export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qid';
export const FORGET_PASSWORD_PREFIX = 'forget-password:';
export const PUBSUB_NEW_MESSAGE = 'PUBSUB_NEW_MESSAGE';

export const listingData = [
  {
    name: 'Yeti Hondo',
    imageUrl:
      'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
    price: 34,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Furniture,
    userId: 18,
    city: 'Al Hoceima',
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    imageUrl:
      'https://i.postimg.cc/qh9DKgjX/apple-mmef2am-a-airpods-wireless-earphones-earpods-1304131.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    category: Categories.Electronics,
    price: 89.99,
    userId: 17,
    city: 'Fes',
  },
  {
    name: 'Airmax 270',
    imageUrl:
      'https://res.cloudinary.com/wesbos/image/upload/v1579815920/sick-fits-keystone/5e2a13f0689b2835ae71d1a5.jpg',
    price: 52.34,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi!',
    category: Categories.Clothes,
    userId: 17,
    city: 'El Jadida',
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    imageUrl: 'https://i.postimg.cc/PPzhtk5F/86.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    category: Categories.Electronics,
    price: 399.99,
    userId: 18,
    city: 'Al Hoceima',
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    imageUrl:
      'https://i.postimg.cc/mcP0FxT4/logitech-gaming-g-brand-series-g-600-mmo-gaming-mouse-black.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    category: Categories.Electronics,
    price: 49.99,
    userId: 17,
    city: 'Meknes',
  },
  ,
  {
    name: 'KITH Hoodie',
    imageUrl:
      'https://res.cloudinary.com/wesbos/image/upload/v1579815935/sick-fits-keystone/5e2a13ff689b2835ae71d1a7.jpg',
    price: 235.62,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Clothes,
    userId: 17,
    city: 'Khemisset',
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    imageUrl: 'https://i.postimg.cc/Jy8ks8ND/s-l1600-5.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    category: Categories.Clothes,
    price: 599.99,
    userId: 18,
    city: 'Marrakesh',
  },
  ,
  {
    name: 'Fanorak',
    imageUrl:
      'https://res.cloudinary.com/wesbos/image/upload/v1579815935/sick-fits-keystone/5e2a13ff689b2835ae71d1a7.jpg',
    price: 252.342,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Clothes,
    userId: 17,
    city: 'Marrakesh',
  },
  {
    name: 'Yeti Cooler',
    imageUrl:
      'http://res.cloudinary.com/wesbos/image/upload/v1579815999/sick-fits-keystone/5e2a143f689b2835ae71d1ad.jpg',
    price: 75.442,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .!',
    category: Categories.Other,
    city: 'Temara',
    userId: 17,
  },
  {
    name: 'Naked and Famous Denim',
    imageUrl:
      'https://res.cloudinary.com/wesbos/image/upload/v1579816030/sick-fits-keystone/5e2a145d689b2835ae71d1af.jpg',
    price: 75.442,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Clothes,
    userId: 18,
    city: 'Oujda',
  },
  {
    name: 'Rimowa Luggage',
    imageUrl:
      'https://res.cloudinary.com/wesbos/image/upload/v1579816060/sick-fits-keystone/5e2a147b689b2835ae71d1b1.png',
    price: 953.657,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Other,
    userId: 17,
    city: 'Rabat',
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    imageUrl:
      'https://i.postimg.cc/Y42ScCN3/canon-1263c005-eos-80d-dslr-camera-1225876.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    category: Categories.Electronics,
    price: 929.99,
    userId: 17,
    city: 'Safi',
  },
  ,
  {
    name: 'Goose',
    imageUrl:
      'http://res.cloudinary.com/wesbos/image/upload/v1579816128/sick-fits-keystone/5e2a14bf689b2835ae71d1b7.jpg',
    price: 74.544,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Clothes,
    userId: 17,
    city: 'Tangier',
  },
  {
    name: 'Ultraboost',
    imageUrl:
      'http://res.cloudinary.com/wesbos/image/upload/v1579816141/sick-fits-keystone/5e2a14cc689b2835ae71d1b9.jpgg',
    price: 64.544,
    description:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam inventore eum expedita tempora distinctio eligendi .',
    category: Categories.Clothes,
    userId: 18,
    city: 'Skhirat',
  },
];
