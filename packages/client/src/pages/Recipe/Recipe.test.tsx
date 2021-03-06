import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getStepTabIndex } from '.';
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
                ingredients: [{ name: 'cheese', quantity: 2, unit: 'unit' }],
                startTime: 10,
              },
              {
                order: 2,
                instruction: 'Dice the tomato',
                ingredients: [{ name: 'tomato', quantity: 2, unit: 'unit' }],
                startTime: 20,
              },
              {
                order: 3,
                instruction: 'Toss the salad',
                ingredients: [{ name: 'salad', quantity: 2, unit: 'unit' }],
                startTime: 30,
              },
            ],
            ingredients: [
              { name: 'tomato', quantity: 2, unit: 'unit' },
              { name: 'cheese', quantity: 2, unit: 'unit' },
              { name: 'salad', quantity: 2, unit: 'unit' },
            ],
          },
        },
      },
    };
  });

  afterEach(cleanup);

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

  test('renders the first recipe step panel by default', async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <MockedProvider mocks={[mockQuery]} addTypename={false}>
          <AppRoutes />
        </MockedProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const step = screen.getByText(/cut the cheese/i);
      expect(step).toBeInTheDocument();
    });
  });

  test('renders all recipe step tabs', async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <MockedProvider mocks={[mockQuery]} addTypename={false}>
          <AppRoutes />
        </MockedProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const steps = screen.getAllByRole('tab');
      expect(steps.length).toBe(3);
    });
  });

  test('getStepTabIndex should return the correct recipe tab index based on given video playtime', () => {
    const steps = [
      {
        order: 1,
        instruction: 'Cut the cheese',
        ingredients: [{ name: 'cheese', quantity: 2, unit: 'unit' }],
        startTime: 10,
      },
      {
        order: 2,
        instruction: 'Dice the tomato',
        ingredients: [{ name: 'tomato', quantity: 2, unit: 'unit' }],
        startTime: 20,
      },
      {
        order: 3,
        instruction: 'Toss the salad',
        ingredients: [{ name: 'salad', quantity: 2, unit: 'unit' }],
        startTime: 30,
      },
    ];

    expect(getStepTabIndex(0, steps)).toBe(0);
    expect(getStepTabIndex(10, steps)).toBe(0);
    expect(getStepTabIndex(19, steps)).toBe(0);
    expect(getStepTabIndex(20, steps)).toBe(1);
    expect(getStepTabIndex(29, steps)).toBe(1);
    expect(getStepTabIndex(99999, steps)).toBe(2);
  });

  test('renders correct step panel on tab click', async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <MockedProvider mocks={[mockQuery]} addTypename={false}>
          <AppRoutes />
        </MockedProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(2));
      expect(screen.getByText(/dice the tomato/i)).toBeInTheDocument();
    });
  });
});
