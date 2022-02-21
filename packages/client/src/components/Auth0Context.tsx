import { Context, createContext, useEffect, useMemo, useState } from 'react';
import createAuth0Client, { Auth0ClientOptions } from '@auth0/auth0-spa-js';

const noop = (args?: any): void => {};

type Noop = typeof noop;
export interface AuthContextValues {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  handleRedirectCallback?: Noop;
  getIdTokenClaims: Noop;
  loginWithRedirect: Noop;
  getTokenSilently: Noop;
  logout: Noop;
}

const defaultContextValue: AuthContextValues = {
  isAuthenticated: false,
  user: undefined,
  isLoading: false,
  handleRedirectCallback: noop,
  getIdTokenClaims: noop,
  loginWithRedirect: noop,
  getTokenSilently: noop,
  logout: noop,
};

export type AuthContext = Context<AuthContextValues>;

export const Auth0Context: AuthContext =
  createContext<AuthContextValues>(defaultContextValue);

export interface AuthState {
  auth0Client: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: any;
}

export function Auth0Provider({ children }: any) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    auth0Client: null,
  });

  const config: Auth0ClientOptions = useMemo(
    () => ({
      domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
      client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
      redirect_uri: window.location.origin,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
    [],
  );

  const memoHandleRedirectCallback = useMemo(() => handleRedirectCallback, []);
  const memoInitAuth0 = useMemo(() => initializeAuth0, []);

  useEffect(() => {
    async function init() {
      try {
        await memoInitAuth0(config, memoHandleRedirectCallback);
      } catch (e) {
        console.error(e);
      }
    }
    init();
  }, [config, memoHandleRedirectCallback, memoInitAuth0]);

  async function initializeAuth0(
    options: Auth0ClientOptions,
    redirectCb?: any,
  ): Promise<void> {
    const auth0Client = await createAuth0Client(options);

    // check to see if they have been redirected after login
    if (window.location.search.includes('code=')) {
      return redirectCb();
    }
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    setAuthState({
      ...authState,
      isLoading: false,
      isAuthenticated,
      user,
      auth0Client,
    });
  }

  async function handleRedirectCallback() {
    setAuthState({ ...authState, isLoading: true });
    await authState.auth0Client.handleRedirectCallback();
    const user = await authState.auth0Client.getUser();
    setAuthState({
      ...authState,
      user,
      isAuthenticated: true,
      isLoading: false,
    });
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const { auth0Client, isLoading, isAuthenticated, user } = authState;
  const values: AuthContextValues = {
    isLoading,
    isAuthenticated,
    user,
    loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
    getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
    getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
    logout: (...p: any) => auth0Client.logout(...p),
  };

  return (
    <Auth0Context.Provider value={values}>{children}</Auth0Context.Provider>
  );
}
