import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login_Page from "./pages/Login_Page";
import Employee_Landing from "./pages/Employee/Employee_Landing";
import Admin_Landing from "./pages/Admin/Admin_Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login_Page />} />
        <Route path="/employee-landing" element={<Employee_Landing />} />
        <Route path="/admin-landing" element={<Admin_Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
