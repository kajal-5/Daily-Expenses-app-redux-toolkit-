import { render, screen } from "@testing-library/react";
import ItemForm from "./ItemForm";
import { Provider } from "react-redux";
import store from "../../store";
import axios from "axios";


test("renders Add Item button", () => {
  render(
    <Provider store={store}>
      <ItemForm />
    </Provider>
  );

  const buttonElement = screen.getByText(/add to cart/i);
  expect(buttonElement).toBeInTheDocument();
});
