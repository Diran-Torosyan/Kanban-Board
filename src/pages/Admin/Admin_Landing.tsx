import React from "react";
import Landing_Header from "../../components/Global/Landing_Header"
import Dashboard_Bar from "../../components/Global/Dashboard_Bar"

const Admin_Landing: React.FC = () => {
  return (
    <div>
      <Landing_Header/>
      <Dashboard_Bar/>
      <h1>Admin Home</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Admin_Landing;
