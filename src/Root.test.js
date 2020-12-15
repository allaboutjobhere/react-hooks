import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import Root from './Root';

const testRenderHome = () => {

  const {getByText} = render(

    <Root />,
  );

  const element = getByText(/0/i);

  expect(

    element,

  ).toBeInTheDocument();
};

const testRenderNotFound = () => {
  
  window.history.pushState(

    {},
    'NotFound',
    '/no/match/route',
  );

  const {getByText} = render(

    <Root />,
    {
      wrapper: BrowserRouter,
    },
  );

  const element = getByText(/404/i);

  expect(

    element,

  ).toBeInTheDocument();
};

test(

  'Root, render: Home',
  testRenderHome,
);

test(
  
  'Root, render: NotFound',
  testRenderNotFound,
);
