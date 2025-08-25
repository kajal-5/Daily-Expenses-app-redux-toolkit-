import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import CartButton from "../Components/Cart/CartButton";
import { MemoryRouter } from "react-router-dom";

test("renders Cart text", () => {
  renderWithProviders(<MemoryRouter>
    <CartButton />
  </MemoryRouter>);
  expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
