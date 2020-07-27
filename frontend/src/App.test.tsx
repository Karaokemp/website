import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Karaokemp title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to Karaokemp!/i);
  expect(linkElement).toBeInTheDocument();
});
