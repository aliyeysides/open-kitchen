import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Auth0Context, Auth0Provider } from './Auth0Context';
import AuthorizedApolloProvider from './AuthorizedApolloProvider';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

describe('Auth Context Provider', () => {
  afterEach(cleanup);

  test('provides logged off state by default', async () => {
    render(
      <MemoryRouter>
        <Auth0Provider value={{ user: { nickname: 'jobin' } }}>
          <AuthorizedApolloProvider>
            <Auth0Context.Consumer>
              {(authState) =>
                authState.user ? <LogoutButton /> : <LoginButton />
              }
            </Auth0Context.Consumer>
          </AuthorizedApolloProvider>
        </Auth0Provider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  });

  // test('provides logged on state after signing in', async () => {
  // render(
  //   <MemoryRouter>
  //     <Auth0Provider value={{ user: { nickname: 'jobin' } }}>
  //       <AuthorizedApolloProvider>
  //         <Auth0Context.Consumer>
  //           {(authState) =>
  //             authState.user ? <LogoutButton /> : <LoginButton />
  //           }
  //         </Auth0Context.Consumer>
  //       </AuthorizedApolloProvider>
  //     </Auth0Provider>
  //   </MemoryRouter>,
  // );
  // await waitFor(() => {
  //   expect(screen.getByTestId('login-button')).toBeInTheDocument();
  // });
  // });
});
