import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import CreateAccount from "./CreateAccount";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/create-account"
          element={<CreateAccount />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;