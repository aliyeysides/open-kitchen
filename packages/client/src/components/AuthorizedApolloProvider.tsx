import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { createUploadLink } from 'apollo-upload-client';
import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthorizedApolloProvider: FC = ({ children }) => {
  const { getAccessTokenWithPopup } = useAuth0();

  const httpLink = createUploadLink({
    uri: '/graphql',
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenWithPopup();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
