import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth";
import cartReducer from "../store/cart";
import themeReducer from "../store/themeSlice";
import Header from "../components/Header/Header";

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      theme: themeReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
};

describe("Header component", () => {
  test("renders site title/logo", () => {
    renderWithStore({
      auth: { token: null, email: null },
      cart: { status: null, items: [] },
      theme: { isPremium: false },
    });

    expect(screen.getByText(/daily-expense/i)).toBeInTheDocument();
  });

  test("renders Login link when user is not authenticated", () => {
    renderWithStore({
      auth: { token: null, email: null },
      cart: { status: null, items: [] },
      theme: { isPremium: false },
    });

    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  test("renders Logout button and welcome message when user is authenticated", () => {
    renderWithStore({
      auth: { token: "123", email: "test@test.com" },
      cart: { status: "success", items: [] },
      theme: { isPremium: true },
    });

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome, test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/sent successfully/i)).toBeInTheDocument();
  });

  test("renders Cart button with item count", () => {
    renderWithStore({
      auth: { token: "123", email: "test@test.com" },
      cart: { status: null, items: [{ id: 1 }, { id: 2 }] },
      theme: { isPremium: false },
    });

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
});
