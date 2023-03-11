import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';

import Home from '../components/Home'

class ResizeObserver {
    observe() {}
    unobserve() {}
  }
window.ResizeObserver = ResizeObserver;
test('Home Test 1', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>);
  });


