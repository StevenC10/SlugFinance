import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Portfolio from '../components/Portfolio';


// https://github.com/apexcharts/react-apexcharts/issues/425
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

beforeAll(() => {
    localStorage.setItem('user', 'lance@ucsc.edu');
    server.listen();
});
afterEach(() => {
  assignMock.mockClear();
  server.resetHandlers();
});
 afterAll(() => server.close());

test('Page Loads', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);

  await new Promise((r) => setTimeout(r, 4000));
});

test('Click on Log In', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Log out'));
  fireEvent.click(screen.getByText('Log in'));
});

test('Click on Sign Up', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Sign up'));
  localStorage.setItem('user', 'lance@ucsc.edu');
});

test('Click Remove', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);

  await new Promise((r) => setTimeout(r, 4000));
  
  await fireEvent.click(screen.getAllByLabelText('remove')[0]);
}, 60_000);

test('Click Redirect', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);

  await new Promise((r) => setTimeout(r, 4000));
  
  await fireEvent.click(screen.getAllByLabelText('redirect')[0]);
}, 60_000);

test('Click on My Portfolio', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('myPortfolio'));
});

test('NonExistent User Loads', async () => {
  localStorage.setItem('user', 'asdfhjsadfhjasdfhjasdfhjasdfhj');
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);
  await new Promise((r) => setTimeout(r, 2000));
});

test('Click on Import', async () => {
  render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>);
  fireEvent.click(screen.getByText('Import'));
});