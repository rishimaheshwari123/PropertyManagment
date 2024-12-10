import React from "react";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/auth/OpenRoute";
import Login from "./pages/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./pages/Home";
import PropertyInformation from "./pages/PropertyInformation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyCommiti from "./pages/PropertyCommiti";
import Units from "./pages/Units";

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
          <Route
            path="/propertycomitee/:id"
            element={
              <PrivateRoute>
                <PropertyCommiti />
              </PrivateRoute>
            }
          />
          <Route
            path="/propertyunits/:id"
            element={
              <PrivateRoute>
                <Units />
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
