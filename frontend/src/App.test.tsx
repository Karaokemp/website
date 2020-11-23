import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('page shows greetings', () => {
  const { getByText } = render(<App />);
  const title = getByText(/>Karaokemp Website!/i);
  expect(title).toBeInTheDocument();
});
