import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

const config: Auth0ProviderOptions = {
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  clientId: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
};

export default function AuthProvider({ children }: any) {
  return <Auth0Provider {...config}>{children}</Auth0Provider>;
}
