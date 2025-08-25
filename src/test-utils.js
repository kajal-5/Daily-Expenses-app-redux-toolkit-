// src/test-utils.js
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// import your reducers
import cartReducer from "./store/cart";
import authReducer from "./store/auth"; // if you also need auth in tests

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        cart: cartReducer,
        auth: authReducer, // include more slices if needed
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}


















// // src/test-utils.js
// import React from "react";
// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { MemoryRouter } from "react-router-dom";

// import authReducer from "./store/auth";
// import cartReducer from "./store/cart";
// import themeReducer from "./store/themeSlice";

// export function renderWithProviders(
//   ui,
//   {
//     preloadedState = {},
//     store = configureStore({
//       reducer: {
//         auth: authReducer,
//         cart: cartReducer,
//         theme: themeReducer, // ✅ include theme slice
//       },
//       preloadedState,
//     }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return (
//       <Provider store={store}>
//         {children}
//       </Provider>
//     );
//   }

//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }


// // // src/test-utils.js
// import React from "react";
// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { MemoryRouter } from "react-router-dom";

// import authReducer from "./store/auth";
// import cartReducer from "./store/cart";
// import themeReducer from "./store/themeSlice";

// export function renderWithProviders(
//   ui,
//   {
//     preloadedState = {},
//     store = configureStore({
//       reducer: {
//         auth: authReducer,
//         cart: cartReducer,
//         theme: themeReducer, // ✅ include theme slice
//       },
//       preloadedState,
//     }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return (
//       <Provider store={store}>
//         return <Provider store={store}>{children}</Provider>;
//       </Provider>
//     );
//   }

//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }
