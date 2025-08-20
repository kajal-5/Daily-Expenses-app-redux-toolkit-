import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../store";
import ForgotPasswordPage from "../ForgotPasswordPage";

test("renders forgot password text", () => {
  render(
    <Provider store={store}>
      <ForgotPasswordPage />
    </Provider>
  );

  const textElement = screen.getByText(/forgot password/i);
  expect(textElement).toBeInTheDocument();
});
