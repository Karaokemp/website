import React from 'react';
import { render } from '@testing-library/react';
import BackendState from './backendState.component';

test('BackendState component shows titles', () => {
  const { getByText } = render(<BackendState />);
  const requestTitle = getByText(/Requests/i);
  const readyTitle = getByText(/Ready songs/i);
  expect(requestTitle).toBeInTheDocument();
  expect(requestTitle).toBeInTheDocument();
});
