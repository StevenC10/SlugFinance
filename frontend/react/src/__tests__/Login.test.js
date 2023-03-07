// __tests__/Login.test.js

import {render, fireEvent} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Login from '../components/Login';

const URL = 'http://localhost:3000/login';

const server = setupServer(
  rest.post(URL, async (req, res, ctx) => {
    const user = await req.json();
    return user.email === 'partickchen@ucsc.edu'
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Sucess', async () => {
  // load login screen
  render(<BrowserRouter><Login /></BrowserRouter>);

  // insert email into input
  const email = screen.getByRole('textbox', {name: 'Email Address'});
  await userEvent.type(email, 'partickchen@ucsc.edu');

  // insert password into input
  const password = screen.getByPlaceholderText('••••••••••');
  await userEvent.type(password, 'partick');

  fireEvent.click(screen.getByRole('button', {name: 'Sign in'}));

  // should not be null because user exists
  await waitFor(() => {
    expect(localStorage.getItem('user')).not.toBe(null);
  });
});

test('Fail', async () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };

  const email = screen.getByRole('textbox', {name: 'Email Address'});
  await userEvent.type(email, 'partickchen@ucsc.edu');

  const password = screen.getByPlaceholderText('••••••••••');
  await userEvent.type(password, 'particke');

  fireEvent.click(screen.getByRole('button', {name: 'Sign in'}));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });

  // should be null because user does not exist
  expect(localStorage.getItem('user')).toBe(null);
});
