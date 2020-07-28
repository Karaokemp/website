import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('page renders correctly', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Welcome to Karaokemp!/i);
  expect(title).toBeInTheDocument();
});
