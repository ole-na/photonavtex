import App from "../App";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

test("startingAppWithoutAnyCrashes", () => {
  render(<App />);
});

test('renders copyright', () => {
  render(<App />);
  const copyright = screen.getByText(/Copyright/i);
  expect(copyright).toBeInTheDocument();
});
