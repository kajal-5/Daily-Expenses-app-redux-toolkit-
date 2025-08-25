import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import cartReducer, { fetchCartFromAPI } from "../../../store/cart";
import authReducer from "../../../store/auth";

jest.mock("axios");

describe("Cart async thunks", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      // ✅ do NOT manually add thunk
      preloadedState: {
        auth: { email: "test@example.com" },
        cart: { items: [] },
      },
    });

    jest.clearAllMocks();
  });

  test("fetchCartFromAPI returns items on success", async () => {
    const mockData = {
      id1: { name: "Shoe", price: 100, quantity: 1 },
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchCartFromAPI());
    const state = store.getState();

    expect(state.cart.items).toEqual([
      { id: "id1", name: "Shoe", price: 100, quantity: 1 },
    ]);

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
