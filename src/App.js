import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromAPI } from "./store/cart.js";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header/Header.js";
import { loadStoredUser } from "./store/auth.js";
import "./App.css";


function App() {
    const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadStoredUser());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartFromAPI()); // ✅ load cart if logged in
    }
  }, [token, dispatch]);
  return (
    <>
      <Router>
        <Header />
      </Router>
    </>
  );
}

export default App;
