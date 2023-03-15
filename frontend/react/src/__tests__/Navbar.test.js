import {render, fireEvent, getByText} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter, Router, Switch, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Navbar from '../components/Navbar';
import Login from '../components/Login';

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
          <Navbar />
        </BrowserRouter>);
});

test('Click on My Portfolio', async () => {
  render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('myPortfolio'));
});

test('Click on Log In', async () => {
  render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Log in'));
});

test('Click on Sign Up', async () => {
  render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Sign up'));
});

test('Click on Log Out', async () => {
  localStorage.setItem('user', {personemail: 'partickchen%40ucsc.edu', personpassword:'partick'});
  render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>);
  // insert email into input
  await fireEvent.click(screen.getByRole('button', {name: 'Log out'}));
});