import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Individual from '../components/Individual';

jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }));

const URL = 'http://localhost:3000/individual';

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

test('Search Positive Stock', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  const email = screen.getByLabelText('searching');
  await userEvent.type(email, 'TSLA');
  fireEvent.submit(email);

  await new Promise((r) => setTimeout(r, 4000));
  await fireEvent.click(screen.getByText('1 Week'));
  await fireEvent.click(screen.getByText('Add to myPortfolio'));
});

test('Search Negative Stock', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  const email = screen.getByLabelText('searching');
  await userEvent.type(email, 'PATK');
  fireEvent.submit(email);

  await new Promise((r) => setTimeout(r, 4000));
});

test('Add to Stock Portfolio', async () => {
  localStorage.setItem('user', 'lance@ucsc.edu');
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  const email = screen.getByLabelText('searching');
  await userEvent.type(email, 'TSLA');
  fireEvent.submit(email);

  await new Promise((r) => setTimeout(r, 10000));
  fireEvent.click(screen.getByText('Add to myPortfolio'));
  await fireEvent.click(screen.getByRole('button', {name: 'Log out'}));
}, 60_000);

test('Search UNDEFINED Stock', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  const email = screen.getByLabelText('searching');
  await userEvent.type(email, 'dsfasdf');
  fireEvent.submit(email);

  await new Promise((r) => setTimeout(r, 4000));
  fireEvent.click(screen.getByText('1 Week'));
});

test('Click on one month', async () => {
    render(
        <BrowserRouter>
          <Individual />
        </BrowserRouter>);
    fireEvent.click(screen.getByText('1 Month'));
});

test('Click on six months', async () => {
    render(
        <BrowserRouter>
          <Individual />
        </BrowserRouter>);
    fireEvent.click(screen.getByText('6 Months'));
});

test('Click on one year', async () => {
    render(
        <BrowserRouter>
          <Individual />
        </BrowserRouter>);
    fireEvent.click(screen.getByText('1 Year'));
});

test('Click on My Portfolio', async () => {
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('myPortfolio'));
});

test('Click on Log Out', async () => {
  localStorage.setItem('user', {personemail: 'partickchen%40ucsc.edu', personpassword:'partick'});
  render(
      <BrowserRouter>
        <Individual />
      </BrowserRouter>);
  // insert email into input
  await fireEvent.click(screen.getByRole('button', {name: 'Log out'}));
});