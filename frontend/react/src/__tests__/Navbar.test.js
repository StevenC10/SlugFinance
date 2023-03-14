import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Individual from '../components/Navbar';

const URL = 'http://localhost:3000/navbar';

const server = setupServer(
    rest.post(URL, async (req, res, ctx) => {
      const user = await req.json();
      return user.email === 'partickchen@ucsc.edu'
    }),
  );

let assignMock = jest.fn();

delete window.location;
window.location = { replace: assignMock, reload: assignMock };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
 afterAll(() => server.close());

test('Page Loads', async () => {
    render(
        <BrowserRouter>
          <Individual />
        </BrowserRouter>);
});

test('Click on My Portfolio', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('myPortfolio'));
});

test('Click on Log In', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Log in'));
});

test('Click on Sign Up', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Sign up'));
});