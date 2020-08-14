import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('page shows greetings', () => {
  const { getByText } = render(<App />);
  const title = getByText(/Welcome to The Karaokemp!/i);
  expect(title).toBeInTheDocument();
});
