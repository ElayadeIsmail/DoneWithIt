import { Categories } from '../generated/graphql';

export interface createListingFormValues {
  name: string;
  price: number;
  description: string;
  image: File;
  city: string;
  category: Categories;
}
