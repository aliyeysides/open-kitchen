import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

console.log('uri:', `${process.env.REACT_APP_AUTH0_REDIRECT_URI}`);

const config: Auth0ProviderOptions = {
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  clientId: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
  redirectUri: `${process.env.REACT_APP_AUTH0_REDIRECT_URI}`,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
};

export default function AuthProvider({ children }: any) {
  return <Auth0Provider {...config}>{children}</Auth0Provider>;
}
