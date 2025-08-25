import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store"; // your real Redux store
import ItemForm from "../Components/Shop/ItemForm";

describe("ItemForm component", () => {
  let originalDispatch;

  beforeEach(() => {
    // Mock dispatch so addItemToAPI does not actually run
    originalDispatch = store.dispatch;
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ItemForm />
      </Provider>
    );
  });

  afterEach(() => {
    // Restore original dispatch
    store.dispatch = originalDispatch;
  });

  test("renders all input fields and Add to Cart button", () => {
    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
  });

  test("updates input values", () => {
    const nameInput = screen.getByLabelText(/item name/i);
    const quantityInput = screen.getByLabelText(/quantity/i);
    const priceInput = screen.getByLabelText(/price/i);

    fireEvent.change(nameInput, { target: { value: "Apple" } });
    fireEvent.change(quantityInput, { target: { value: 3 } });
    fireEvent.change(priceInput, { target: { value: 50 } });

    expect(nameInput.value).toBe("Apple");
    expect(quantityInput.value).toBe("3");
    expect(priceInput.value).toBe("50");
  });

  test("calculates total dynamically", () => {
    const quantityInput = screen.getByLabelText(/quantity/i);
    const priceInput = screen.getByLabelText(/price/i);

    fireEvent.change(quantityInput, { target: { value: 2 } });
    fireEvent.change(priceInput, { target: { value: 100 } });

    expect(screen.getByText(/total: ₹200/i)).toBeInTheDocument();
  });
});

