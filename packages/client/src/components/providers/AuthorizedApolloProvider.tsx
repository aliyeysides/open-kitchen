import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { createUploadLink } from 'apollo-upload-client';
import { ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import mixpanel from 'mixpanel-browser';

export interface AuthorizedApolloProviderProps {
  children: ReactNode | ReactNode[];
}

const AuthorizedApolloProvider = ({
  children,
}: AuthorizedApolloProviderProps): JSX.Element => {
  const { getAccessTokenSilently, user } = useAuth0();

  if (user) {
    mixpanel.identify(user.email);
    mixpanel.people.set({
      Plan: 'beta-user',
      Email: user.email,
      Name: user.name,
    });
    mixpanel.track('User Authenticated', { ...user });
  }

  const httpLink = createUploadLink({
    uri: '/graphql',
  });

  const authLink = setContext(async () => {
    if (user) {
      const token = await getAccessTokenSilently();
      if (token) {
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
    }
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
