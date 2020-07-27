import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('page renders correctly', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to Karaokemp!/i);
  expect(linkElement).toBeInTheDocument();
});
