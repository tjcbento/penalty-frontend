import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Toast container, position top-center */}
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

          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="home" element={<Home />} />
                  {/* add other protected pages here */}
                </Routes>
              </MainLayout>
            }
          />

          {/* fallback to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
