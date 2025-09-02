import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import ForgotPasswordPage from "../Components/Login/ForgotPasswordPage";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("ForgotPasswordPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ auth: { loading: false, error: null } });
  });

  test("renders email input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test("renders reset password button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("button", { name: /Send Reset Link/i })).toBeInTheDocument();
  });

  test("allows typing in email input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

 test("shows success message when successMessage exists", () => {
    store = mockStore({ auth: { loading: false, error: null, successMessage: "Email sent!" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/email sent/i)).toBeInTheDocument();
  });
});

