import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { NextPageContext } from 'next';
import { PaginatedListing } from '../generated/graphql';
import { createWithApollo } from './createWithApollo';

const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:4000/graphql',
      options: {
        reconnect: true,
      },
    })
  : null;

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink!,
      httpLink
    )
  : httpLink;

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link: splitLink,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers?.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            listings: {
              keyArgs: [],
              merge(
                existing: PaginatedListing | undefined,
                incoming: PaginatedListing,
                { args }
              ): PaginatedListing {
                if (!args?.cursor) {
                  return incoming;
                }
                return {
                  ...incoming,
                  listings: [
                    ...(existing?.listings || []),
                    ...incoming.listings,
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
