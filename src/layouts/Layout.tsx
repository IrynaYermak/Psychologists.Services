import App from "../components/App";
import { useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  return (
    <div className={isHome ? "home-layout" : "default-layout"}>
      <App />
    </div>
  );
}
