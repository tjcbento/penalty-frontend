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
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            marginTop: "100px",
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
