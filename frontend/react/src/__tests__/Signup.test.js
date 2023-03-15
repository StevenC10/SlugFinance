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
// https://stackoverflow.com/questions/16106701/how-to-generate-a-random-string-of-letters-and-numbers-in-javascript
let userName = Math.random().toString(36).substring(7);
userName += "@ucsc.edu";
const passWord = Math.random().toString(36).substring(7);

test('Sucess', async () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  window.alert = () => {};

  const email = screen.getByRole('textbox', {name: 'Email Address'});
  await userEvent.type(email, userName);

  const password = screen.getByLabelText('password');
  await userEvent.type(password, passWord);

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
  await userEvent.type(email, userName);

  const password = screen.getByLabelText('password');
  await userEvent.type(password, passWord);

  fireEvent.click(screen.getByRole('button', {name: 'Sign up'}));
  await waitFor(() => {
    expect(alerted).toBe(true);
  });
});
