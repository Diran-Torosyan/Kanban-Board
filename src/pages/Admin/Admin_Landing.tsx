import React from "react";
import Landing_Header from "../../components/Global/Landing_Header"
import Dashboard_Bar from "../../components/Global/Dashboard_Bar"

const Admin_Landing: React.FC = () => {
  return (
    <div>
      <Landing_Header/>
      <Dashboard_Bar title="Overview" ></Dashboard_Bar>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Admin Home
      </h1>
      <p
        style= {{
          textAlign:"center",
        }}
      >
        Work in progress
      </p>
    </div>
  );
};

export default Admin_Landing;
