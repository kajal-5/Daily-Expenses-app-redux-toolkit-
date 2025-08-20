import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import cartReducer from "../../store/cart";
import authReducer, { logout } from "../../store/auth";

describe("Header component", () => {
  const renderWithStore = (preloadedState) => {
    const store = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      preloadedState,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    return store;
  };

  test("shows login link when user is not logged in", () => {
    renderWithStore({ auth: { token: null, email: "" }, cart: { items: [] } });
    const header = screen.getByRole("banner"); // <header> has role banner
    expect(within(header).getByText(/Login/i)).toBeInTheDocument();
  });

  test("shows welcome message when user is logged in", () => {
    renderWithStore({ auth: { token: "abc123", email: "test@example.com" }, cart: { items: [] } });
    expect(screen.getByText(/Welcome, test@example.com/i)).toBeInTheDocument();
  });

  test("shows Items, Cart button, and Logout when logged in", () => {
    const store = renderWithStore({ auth: { token: "abc123", email: "test@example.com" }, cart: { items: [] } });

    expect(screen.getByText(/Items/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
    const logoutBtn = screen.getByText(/Logout/i);
    expect(logoutBtn).toBeInTheDocument();

    // Optional: check logout dispatch works
    fireEvent.click(logoutBtn);
    expect(store.getState().auth.token).toBeNull();
  });
});
