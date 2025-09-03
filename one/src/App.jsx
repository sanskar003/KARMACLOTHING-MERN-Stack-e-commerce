import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Nav";
import Page01home from "./pages/Page01home";
import Page02About from "./pages/Page02About";
import Page03Clothing from "./pages/Page03Clothing";
import Page04Cart from "./pages/Page04Cart";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import PersonalInfo from "./components/PersonalInfo";
import ProductPage from "./components/ProductPage";
import ProtectedLoginRoute from "./components/ProtectedLoginRoute";
import Page05Checkout from "./pages/Page05Checkout";

function App() {
  return (
    <Router>
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

        {/* Content */}

        <div className="">
          <Nav />
          <Routes>
            <Route path="/" element={<Page01home />} />
            <Route path="/about" element={<Page02About />} />
            <Route path="/clothing" element={<Page03Clothing />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Page04Cart />} />
            <Route path="/checkout" element={<Page05Checkout />} />
            <Route
              path="/login"
              element={
                <ProtectedLoginRoute>
                  <Login />
                </ProtectedLoginRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedLoginRoute>
                  <Register />
                </ProtectedLoginRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
