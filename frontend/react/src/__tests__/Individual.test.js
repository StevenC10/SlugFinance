import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Individual from '../components/Individual';

const molly = {
  name: 'Molly Member',
  accessToken: 'some-old-jwt',
};

jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }));

let box = undefined;
const URL = 'http://localhost:3000/individual';

const server = setupServer(
    rest.post(URL, async (req, res, ctx) => {
      const user = await req.json();
      return user.email === 'partickchen@ucsc.edu'
    }),
  );


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
 afterAll(() => server.close());

test('Page Loads', async () => {
    render(
        <BrowserRouter>
          <Individual />
        </BrowserRouter>);
});

test('Click on one week', async () => {
    render(
        <BrowserRouter>
          <Individual />
        </BrowserRouter>);
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
