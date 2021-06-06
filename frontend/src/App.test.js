import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app name', () => {
  render(<App />);
  const appName = screen.getByText(/PhotoNavTex/i);
  expect(appName).toBeInTheDocument();
});
