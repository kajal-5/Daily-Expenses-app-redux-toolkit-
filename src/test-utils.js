import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/cart";
import authReducer from "./store/auth";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        cart: cartReducer,
        auth: authReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}