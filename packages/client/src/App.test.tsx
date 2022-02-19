import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_RECIPES } from './pages/Recipes/constants';
import AppRoutes from './AppRoutes';

describe('App Outlet Container', () => {
  afterEach(() => cleanup);

  test('renders "open kitchen" company name', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const logo = screen.getByText(/open kitchen/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders upload button', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkElement = screen.getByText(/upload/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the RecipesPage on "/" path', async () => {
    const mock: MockedResponse = {
      request: {
        query: GET_RECIPES,
        variables: {},
      },
      result: {
        data: {
          recipes: [
            {
              _id: '',
              ytId: '',
              name: 'Spicy sausage rice',
              steps: [],
              ingredients: [],
            },
          ],
        },
      },
    };

    render(
      <MemoryRouter initialEntries={['/']}>
        <MockedProvider mocks={[mock]} addTypename={false}>
          <AppRoutes />
        </MockedProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const recipePage = screen.getByTestId('recipes-page');
      expect(recipePage).toBeInTheDocument();
    });
  });
});
