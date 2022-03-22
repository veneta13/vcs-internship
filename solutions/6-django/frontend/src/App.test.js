import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('load application', () => {
  render(<App />);
});
