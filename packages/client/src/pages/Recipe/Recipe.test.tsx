import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../AppRoutes';
import { GET_RECIPE } from './constants';

const fakeId = '620fd51a736de2202be2a99d';

const path = `/recipes/${fakeId}`;

describe('Recipe Page', () => {
  let mockQuery: MockedResponse;

  beforeAll(() => {
    mockQuery = {
      request: {
        query: GET_RECIPE,
        variables: { id: fakeId },
      },
      result: {
        data: {
          recipe: {
            _id: fakeId,
            ytId: '',
            name: 'Spicy sausage rice',
            steps: [
              {
                order: 1,
                instruction: 'Cut the cheese',
                ingredients: [{ name: 'tomato', quantity: 2, unit: 'unit' }],
                startTime: 10,
              },
            ],
            ingredients: [{ name: 'tomato', quantity: 2, unit: 'unit' }],
          },
        },
      },
    };
  });

  afterAll(() => cleanup);

  test('renders recipe video title', async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <MockedProvider mocks={[mockQuery]} addTypename={false}>
          <AppRoutes />
        </MockedProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const title = screen.getByText(/spicy/i);
      expect(title).toBeInTheDocument();
    });
  });

  test('renders the first recipe step', async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <MockedProvider mocks={[mockQuery]} addTypename={false}>
          <AppRoutes />
        </MockedProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const step = screen.getByText(/Cut the cheese/i);
      expect(step).toBeInTheDocument();
    });
  });
});
