import { render, screen } from '@testing-library/react';
import App from './App';

test('renders copyright', () => {
  render(<App />);
  const copyright = screen.getByText(/Copyright/i);
  expect(copyright).toBeInTheDocument();
});
