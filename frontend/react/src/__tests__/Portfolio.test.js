import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Portfolio from '../components/Portfolio';


// https://github.com/apexcharts/react-apexcharts/issues/425
jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }));

let box = undefined;
const URL = 'http://localhost:3000/individual';

const server = setupServer(
    rest.post(URL, async (req, res, ctx) => {
      const user = await req.json();
      return user.email === 'partickchen@ucsc.edu'
    }),
  );

beforeAll(() => {
    localStorage.setItem('user', 'lance@ucsc.edu');
    server.listen();
});
afterEach(() => server.resetHandlers());
 afterAll(() => server.close());

test('Page Loads', async () => {
    render(
        <BrowserRouter>
          <Portfolio />
        </BrowserRouter>);

    await screen.findByText('Ticker');
});
