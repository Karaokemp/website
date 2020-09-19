import React from 'react';
import { render } from '@testing-library/react';
import BackendState from './backendState.component';
import { State, YoutubeURL } from '../types';

test('BackendState component shows titles', () => {

  const exampleState = new State()
  const { getByText } = render(<BackendState state ={exampleState}/>);
  const requestsTitle = getByText(/Requests/i);
  const readyTitle = getByText(/Ready songs/i);
  expect(requestsTitle).toBeInTheDocument();
  expect(readyTitle).toBeInTheDocument();
});
