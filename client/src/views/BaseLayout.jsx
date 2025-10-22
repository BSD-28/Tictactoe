import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { themeContext } from "../context/ThemeContext";

function BaseLayout() {
  const { currentTheme, theme } = useContext(themeContext);
  const token = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div className={theme[currentTheme].bgColor}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default BaseLayout;
