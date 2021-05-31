import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loading } from '../../../components/Loading';
import {
  MeDocument,
  MeQuery,
  useConfirmUserMutation,
} from '../../../generated/graphql';
import { withApollo } from '../../../utils/withApollo';

const Confirm: React.FC = () => {
  const router = useRouter();
  const [confirmUserMutation, { loading }] = useConfirmUserMutation();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    async function confirm() {
      const res = await confirmUserMutation({
        variables: {
          token:
            typeof router.query.token === 'string' ? router.query.token : '',
        },
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: 'Query',
              me: data?.confirmUser,
            },
          });
        },
      });
      if (res.data?.confirmUser) {
        router.push('/listings');
        toast.success('Your Account was Confirmed Successfully');
      }
    }
    confirm();
  }, [router.isReady]);

  if (!router.isReady || loading) {
    return <Loading />;
  }
  return <div>Redirecting...</div>;
};

export default withApollo({ ssr: false })(Confirm);
