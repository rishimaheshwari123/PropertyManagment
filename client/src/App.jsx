import React from "react";
import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/auth/OpenRoute";
import Login from "./pages/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./pages/Home";
import PropertyInformation from "./pages/PropertyInformation";

const App = () => {
  return (
    <div>
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
  );
};

export default App;
