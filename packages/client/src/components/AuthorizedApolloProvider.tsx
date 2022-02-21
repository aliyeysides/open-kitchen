import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { createUploadLink } from 'apollo-upload-client';
import { FC, useContext } from 'react';
import { Auth0Context } from './Auth0Context';

interface Props {
  // any props that come into the component
}
const AuthorizedApolloProvider: FC<Props> = ({ children }) => {
  const { getTokenSilently } = useContext(Auth0Context);

  const httpLink = createUploadLink({
    uri: '/graphql', // your URI here...
  });

  const authLink = setContext(async () => {
    if (!getTokenSilently) {
      console.log('hello');
    } else {
      const token = await getTokenSilently();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
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
