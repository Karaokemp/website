import React from 'react';
import { render } from '@testing-library/react';
import BackendState from './backendState.component';

test('BackendState component shows titles', () => {
  const requests = ['https://www.youtube.com/watch?v=3EA_8nnYbT0']
  const ready = ['La La La']
  const { getByText } = render(<BackendState requests= {requests} readySongs = {ready}/>);
  const requestTitle = getByText(/Requests/i);
  const readyTitle = getByText(/Ready songs/i);
  expect(requestTitle).toBeInTheDocument();
  expect(requestTitle).toBeInTheDocument();
});
