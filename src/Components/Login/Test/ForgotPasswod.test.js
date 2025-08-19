import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordPage from "../ForgotPasswordPage"; // adjust path if needed

// ✅ Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders forgot password form", () => {
  render(<ForgotPasswordPage />);
  expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
});

test("submits email and shows success message", async () => {
  // 1. Arrange
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ email: "test@example.com" }),
  });

  render(<ForgotPasswordPage />);
  const input = screen.getByPlaceholderText(/enter email/i);
  const button = screen.getByRole("button", { name: /send link/i });

  // 2. Act
  fireEvent.change(input, { target: { value: "test@example.com" } });
  fireEvent.click(button);

  // 3. Assert
  await waitFor(() =>
    expect(
      screen.getByText(/reset password email sent/i)
    ).toBeInTheDocument()
  );

  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test("shows error if fetch fails", async () => {
  // Make fetch fail
  global.fetch.mockRejectedValueOnce(new Error("Network error"));

  render(<ForgotPasswordPage />);
  const input = screen.getByPlaceholderText(/enter email/i);
  const button = screen.getByRole("button", { name: /send link/i });

  fireEvent.change(input, { target: { value: "wrong@example.com" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  );
});
