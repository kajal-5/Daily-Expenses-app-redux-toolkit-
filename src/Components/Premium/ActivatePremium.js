
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activatePremium, deactivatePremium } from "../../store/themeSlice";
import "./premium.css";

export default function ActivatePremium() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const isPremium = useSelector((state) => state.theme.isPremium);

  // calculate total
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ auto deactivate if total < 10000
  useEffect(() => {
    if (totalAmount < 10000 && isPremium) {
      dispatch(deactivatePremium());
    }
  }, [totalAmount, isPremium, dispatch]);

  // show nothing if not eligible
  if (totalAmount < 10000) {
    return null;
  }

  return (
    <button
      className="premium-btn"
      onClick={() =>
        isPremium ? dispatch(deactivatePremium()) : dispatch(activatePremium())
      }
    >
      {isPremium ? "Deactivate Premium" : "Activate Premium"}
    </button>
  );
}
