import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { fetchCartFromAPI } from "../../../store/cart";
import authReducer from "../../../store/auth";
import axios from "axios";

jest.mock("axios");

describe("Cart async thunks - API requests", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      // no need to add thunk, RTK includes it by default
      preloadedState: {
        auth: { email: "test@example.com" },
        cart: { items: [] },
      },
    });

    jest.clearAllMocks();
  });

  test("fetchCartFromAPI sends request successfully", async () => {
    const mockResponse = {
      data: {
        item1: { name: "Shoe", quantity: 1, unitPrice: 100 },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    await store.dispatch(fetchCartFromAPI());
    const state = store.getState();

    // axios.get should be called with correct Firebase URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://daily-expenses-app-53b16-default-rtdb.firebaseio.com/carts/test@example_com.json"
    );

    // Expect state.cart.items as an array (with id included)
    expect(state.cart.items).toEqual([
      { id: "item1", name: "Shoe", quantity: 1, unitPrice: 100 },
    ]);
  });
});
