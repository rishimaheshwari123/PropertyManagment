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
import Owner from "./pages/Owner";
import RegularBudget from "./pages/RegularBudget";
import Income from "./pages/Income";
import OutCome from "./pages/OutCome";
import Balance from "./pages/Balance";

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
          <Route
            path="/propertyowners/:id"
            element={
              <PrivateRoute>
                <Owner />
              </PrivateRoute>
            }
          />
          <Route
            path="/regularbudget/:id"
            element={
              <PrivateRoute>
                <RegularBudget />
              </PrivateRoute>
            }
          />
          <Route
            path="/regularbudget/income/:id"
            element={
              <PrivateRoute>
                <Income />
              </PrivateRoute>
            }
          />
          <Route
            path="/regularbudget/outcome/:id"
            element={
              <PrivateRoute>
                <OutCome />
              </PrivateRoute>
            }
          />
          <Route
            path="/regularbudget/balance/:id"
            element={
              <PrivateRoute>
                <Balance />
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
