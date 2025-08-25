import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { increaseCartItem, decreaseCartItem } from "../store/cart";
import CartList from "../Components/Cart/CartList";

const renderWithRedux = (component, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("CartList component", () => {
  const initialState = {
    cart: {
      isVisible: true,
      items: [
        { _id: "1", name: "Shoe", price: 100, quantity: 2 },
        { _id: "2", name: "Bag", price: 200, quantity: 1 },
        { _id: "3", name: "Watch", price: 300, quantity: 3 },
        { _id: "4", name: "Cap", price: 50, quantity: 4 },
      ],
    },
  };

  test("renders cart items with correct details", () => {
    renderWithRedux(<CartList />, { preloadedState: initialState });

    expect(screen.getByTestId("cart-title")).toHaveTextContent("Cart Items");
    expect(screen.getByTestId("item-0")).toHaveTextContent("Shoe - ₹100 × 2 = ₹200");
    expect(screen.getByTestId("item-1")).toHaveTextContent("Bag - ₹200 × 1 = ₹200");
    expect(screen.getByTestId("item-2")).toHaveTextContent("Watch - ₹300 × 3 = ₹900");
    expect(screen.getByTestId("item-3")).toHaveTextContent("Cap - ₹50 × 4 = ₹200");
  });

  test("calculates total price correctly", () => {
    renderWithRedux(<CartList />, { preloadedState: initialState });
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: ₹1500");
  });


  test("does not render cart when isVisible is false", () => {
    const hiddenState = { cart: { ...initialState.cart, isVisible: false } };
    renderWithRedux(<CartList />, { preloadedState: hiddenState });

    expect(screen.queryByTestId("cart-container")).toBeNull();
  });

  test("displays correct quantity and total for all items", () => {
    renderWithRedux(<CartList />, { preloadedState: initialState });

    expect(screen.getByTestId("quantity-0")).toHaveTextContent("2");
    expect(screen.getByTestId("total-0")).toHaveTextContent("200");

    expect(screen.getByTestId("quantity-1")).toHaveTextContent("1");
    expect(screen.getByTestId("total-1")).toHaveTextContent("200");

    expect(screen.getByTestId("quantity-2")).toHaveTextContent("3");
    expect(screen.getByTestId("total-2")).toHaveTextContent("900");

    expect(screen.getByTestId("quantity-3")).toHaveTextContent("4");
    expect(screen.getByTestId("total-3")).toHaveTextContent("200");
  });
});
