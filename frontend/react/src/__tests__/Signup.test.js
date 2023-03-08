// __tests__/Login.test.js

import {render, fireEvent} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Login from '../components/Signup';

const URL = 'http://localhost:3000/signup';

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
  render(<BrowserRouter><Login /></BrowserRouter>);
  window.alert = () => {};

  const email = screen.getByRole('textbox', {name: 'Email Address'});
  await userEvent.type(email, 'partickeaachen@ucsc.edu');

  const password = screen.getByLabelText('password');
  await userEvent.type(password, 'partickeaaa');

  fireEvent.click(screen.getByRole('button', {name: 'Sign up'}));
  await waitFor(() => {
    expect(localStorage.getItem('user')).toBe(null);
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

  const password = screen.getByLabelText('password');
  await userEvent.type(password, 'partick');

  fireEvent.click(screen.getByRole('button', {name: 'Sign up'}));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});
