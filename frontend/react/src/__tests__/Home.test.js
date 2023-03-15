import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {act} from 'react-dom/test-utils';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter} from 'react-router-dom';

import Home from '../components/Home'
class ResizeObserver {
    observe() {}
    unobserve() {}
  }
window.ResizeObserver = ResizeObserver;
jest.setTimeout(15000);
jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }));

const URL = 'http://localhost:3000';

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
        <Home />
      </BrowserRouter>);

    
    
  await new Promise((r)=> setTimeout(r,10000));
});
