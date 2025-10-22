import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { themeContext } from "../context/ThemeContext";
import Toastify from "toastify-js";

function Navbar() {
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme, theme } = useContext(themeContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");

    Toastify({
      text: "Logout success",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#34D399",
        color: "#000000",
      },
    }).showToast();
  };
  return (
    <>
      <nav className="flex justify-between items-center bg-white/10 backdrop-blur-lg border-b border-white/20 p-2 px-6">
        <Link to="/" className="cursor-pointer text-xl text-white">
          ⭕❌ TicTacToe
        </Link>
        <div className="flex cursor-pointer">
          {currentTheme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 mr-6 text-neutral-300 hover:text-blue-900"
              onClick={() => setCurrentTheme("dark")}
            >
              <path
                fillRule="evenodd"
                d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-10 mr-6 text-yellow-300 hover:text-yellow-400"
              onClick={() => setCurrentTheme("light")}
            >
              <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
            </svg>
          )}
          <button
            type="button"
            className="w-20 bg-red-600 p-2 text-white hover:bg-red-700  cursor-pointer rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
