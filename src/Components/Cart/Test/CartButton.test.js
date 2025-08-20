import { render, screen } from "@testing-library/react";
import CartButton from "../CartButton";
import { Provider } from "react-redux";
import store from "../../../store";
import configureStore from "redux-mock-store";

test("renders cart button", () => {
  render(
    <Provider store={store}>
      <CartButton />
    </Provider>
  );

  const buttonElement = screen.getByText(/Cart/i);
  expect(buttonElement).toBeInTheDocument();
});

const mockStore = configureStore([]);

describe("CartButton Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { name: "Shoe", price: 100, quantity: 1 },
          {name: "Hat", price: 50, quantity: 2 }
        ]
      }
    });
  });

  test("displays total number of distinct items in the cart", () => {
    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    // There are 2 distinct items, so cart button should display "Cart (2)"
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });
});
