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
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    dispatch(loadStoredUser());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartFromAPI()); // ✅ load cart if logged in
    }
  }, [token, dispatch]);
  
  
  return (
    <div className={`app-container ${isDark ? "dark" : "light"}`}>
      <Router>
        <Header />
        <h1>Welcome to the App</h1>
      <img src= {
          isDark
            ? require("./Images/img1.png")
            : require("./Images/img3.png")
          } alt="App Logo" className="center-image" />
      </Router>
    </div>
  );
}

export default App;
