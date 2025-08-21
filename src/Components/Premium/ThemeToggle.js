import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import "./premium.css";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { isDark, isPremium } = useSelector((state) => state.theme);

  if (!isPremium) return null;

  return (
    <button className="premium-btn" onClick={() => dispatch(toggleTheme())}>
      Switch to {isDark ? "Light" : "Dark"} Theme
    </button>
  );
}
