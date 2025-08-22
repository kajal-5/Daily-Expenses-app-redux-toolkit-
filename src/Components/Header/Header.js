import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";

import LoginPage from "../Login/LoginPage";
import ForgotPasswordPage from "../Login/ForgotPasswordPage";
import ItemForm from "../Shop/ItemForm";
import CartList from "../Cart/CartList";
import ProtectedRoute from "./ProtectedRoute";
import CartButton from "../Cart/CartButton";
import "./header.css";
import ActivatePremium from "../Premium/ActivatePremium";
import ThemeToggle from "../Premium/ThemeToggle";
import DownloadCSV from "../Premium/DownloadCSV";



const Header = () => {
  const { token, email } = useSelector((state) => state.auth);
  const cartStatus = useSelector((state) => state.cart.status);
  const dispatch = useDispatch();
  let statusMessage = "";
  if (cartStatus === "pending") {
    statusMessage = "Sending...";
  } 
  else if (cartStatus === "success") {
    statusMessage = "Sent successfully!";
  } 
  else if (cartStatus === "error") {
    statusMessage = "Sending failed!";
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="header-ribbon">
        <div className="header-content">
          <div className="nav-left">
            <span className="header-title">Daily-Expense</span>
            {!token && <Link to="/">Login</Link>}
            {token && <span>Welcome, {email}</span>}
            {token &&statusMessage && <p>{statusMessage}</p>}
          </div>

          <div className="nav-right">
            {token && (
              <>
                {token && <Link to="/items">Items</Link>}
                <CartButton />
                <ActivatePremium />
                <ThemeToggle />
                <DownloadCSV />
                <button onClick={logoutHandler}>Logout</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Always render cart list so toggle works */}
      {token && <CartList />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/items" element={ <ProtectedRoute> <ItemForm /></ProtectedRoute>}/>
      </Routes>
    </>
  );
};

export default Header;