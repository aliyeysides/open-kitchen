import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { createUploadLink } from 'apollo-upload-client';
import { ReactNode } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { withRoleBasedRedirect } from './RoleBasedAuth';

export interface AuthorizedApolloProviderProps {
  children: ReactNode | ReactNode[];
}

const AuthorizedApolloProvider = ({
  children,
}: AuthorizedApolloProviderProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createUploadLink({
    uri: '/graphql',
  });

  const authLink = setContext(async () => {
    try {
      const token = await getAccessTokenSilently();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } catch (e) {
      throw new Error('Error: Failed getting auth0 access token');
    }
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};



export default withAuthenticationRequired(withRoleBasedRedirect(AuthorizedApolloProvider, {role:'menu-admin'}));
