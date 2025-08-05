import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About"; // Don't forget to import About
import Bets from "./pages/Bets";
import AutomaticBets from "./pages/AutomaticBets";
import Settings from "./pages/Settings";
import MainLayout from "./components/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            duration: 1500,
            style: {
              minWidth: "auto",
              width: "auto",
              maxWidth: "unset",
              padding: "8px 14px", // default padding
              borderRadius: "8px", // default border radius
              background: "#333", // default success background (or you can use a green)
              color: "#fff",
              boxShadow: "0 4px 14px rgb(0 0 0 / 0.1)",
              cursor: "default",
              display: "inline-block",
            },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* All protected routes under MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="bets" element={<Bets />} />
            <Route path="automaticbets" element={<AutomaticBets />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
