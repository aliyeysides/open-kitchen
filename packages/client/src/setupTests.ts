// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

jest.mock('axios');
// jest.mock('@auth0/auth0-spa-js');

// jest.mock('@auth0/auth0-spa-js', () => {
//   return {
//     __esModule: true,
//     default: jest.fn().mockResolvedValue(() => ({
//       isAuthenticated: jest.fn(),
//     })),
//   };
// });
