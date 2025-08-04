import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const buttonClass =
    "w-12 h-10 flex items-center justify-center border rounded hover:bg-gray-100 transition cursor-pointer";

  return (
    <header className="p-4 bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
        <Tippy content="About" placement="bottom" animation="shift-away">
          <button
            onClick={() => navigate("/about")}
            className={buttonClass}
            aria-label="About"
          >
            ⚽
          </button>
        </Tippy>

        <Tippy content="Home" placement="bottom" animation="shift-away">
          <button
            onClick={() => navigate("/home")}
            className={buttonClass}
            aria-label="Home"
          >
            🏠
          </button>
        </Tippy>

        <div className="flex space-x-2">
          <Tippy content="Settings" placement="bottom" animation="shift-away">
            <button
              onClick={() => navigate("/settings")}
              className={buttonClass}
              aria-label="Settings"
            >
              ⚙️
            </button>
          </Tippy>

          <Tippy content="Logout" placement="bottom" animation="shift-away">
            <button
              onClick={logout}
              className={buttonClass}
              aria-label="Logout"
            >
              🚪
            </button>
          </Tippy>
        </div>
      </div>
    </header>
  );
}
