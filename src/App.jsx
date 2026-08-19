import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Departments from "./pages/Departments";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/payroll" element={<ComingSoon />} />
        <Route path="/analytics" element={<ComingSoon />} />
        <Route path="/settings" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
