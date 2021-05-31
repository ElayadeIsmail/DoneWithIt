import { Spinner } from './Spinner';

export const Loading: React.FC = ({}) => {
  return (
    <div className='h-full-min-nav max-w-screen-maxWidth flex items-center justify-center'>
      <Spinner />
    </div>
  );
};
