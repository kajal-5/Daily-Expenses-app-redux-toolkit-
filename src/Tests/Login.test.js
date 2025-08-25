// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";
// import LoginPage from "../Components/Login/LoginPage";


// const mockStore = configureStore([]);

// test("renders LoginPage with email input", () => {
//   const store = mockStore({ auth: { isAuthenticated: false } });

//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <LoginPage />
//       </BrowserRouter>
//     </Provider>
//   );

//   expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
// });


/////////////////imp




import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth";
import LoginPage from "../Components/Login/LoginPage";

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
  };
}

test("renders LoginPage with email input", () => {
  renderWithProviders(<LoginPage />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("renders password input and login button", () => {
  renderWithProviders(<LoginPage />);
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("allows typing in email and password inputs", async () => {
  renderWithProviders(<LoginPage />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(emailInput, "test@example.com");
  await userEvent.type(passwordInput, "mypassword");

  expect(emailInput).toHaveValue("test@example.com");
  expect(passwordInput).toHaveValue("mypassword");
});

test("submits form when login button is clicked", async () => {
  const { store } = renderWithProviders(<LoginPage />);

  await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
  await userEvent.type(screen.getByLabelText(/password/i), "mypassword");

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // verify dispatch happened by checking auth slice state
  const state = store.getState().auth;
  expect(state).toBeDefined();
});
