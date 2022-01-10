import { render, screen } from '@testing-library/react';
import App from './App';

test('renders location', () => {
  render(<App />);
  const locationInput = screen.getByLabelText(/Location/i);
  expect(locationInput).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  const getWeatherButton = screen.getByDisplayValue(/Get weather!/i);
  expect(getWeatherButton).toBeInTheDocument();
});

test('renders temperature paragraph', () => {
  render(<App />);
  const temperatureParagraph = screen.getByText('Temperature:');
  expect(temperatureParagraph).toBeInTheDocument();
});
