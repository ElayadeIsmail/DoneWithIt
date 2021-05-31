import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateMessageMutation } from '../generated/graphql';
import { Button } from './Button';
import { InputField } from './InputField';

interface CreateMessageProps {
  listingId: number;
}

type Inputs = {
  text: string;
};

export const CreateMessage: React.FC<CreateMessageProps> = ({ listingId }) => {
  const [createMessageMutation] = useCreateMessageMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    if (data.text.trim() === '') {
      return;
    }
    await createMessageMutation({
      variables: {
        listingId,
        text: data.text,
      },
    });
    reset();
  };
  return (
    <form
      autoComplete='off'
      className='flex items-center justify-center w-full space-x-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        placeholder='Message'
        name='text'
        register={register}
        error={null}
        autoComplete='off'
      />
      <Button type='submit' disabled={isSubmitting}>
        Send
      </Button>
    </form>
  );
};
