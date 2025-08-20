import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginPage from "../LoginPage";

const mockStore = configureStore([]);

test("renders LoginPage with email input", () => {
  const store = mockStore({ auth: { isAuthenticated: false } });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});
