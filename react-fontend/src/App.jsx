import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
