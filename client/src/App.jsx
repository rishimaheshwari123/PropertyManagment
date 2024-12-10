import React from "react";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/auth/OpenRoute";
import Login from "./pages/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./pages/Home";
import PropertyInformation from "./pages/PropertyInformation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/propertyinformation/:id"
            element={
              <PrivateRoute>
                <PropertyInformation />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
