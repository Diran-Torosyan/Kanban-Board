import React from "react";
import Landing_Header from "../../components/Global/Landing_Header";
import Dashboard_Bar from "../../components/Global/Dashboard_Bar";
import Column from "../../components/Global/Columns";

const Employee_Landing: React.FC = () => {
  const columns = [
    { id: 1, title: "Column Title", tasks: ["Case Title", "Case Title"] },
    {
      id: 2,
      title: "Column Title",
      tasks: ["Case Title", "Case Title", "Case Title"],
    },
    { id: 3, title: "Column Title", tasks: ["Case Title", "Case Title"] },
  ];

  return (
    <div>
      <Landing_Header />
      <Dashboard_Bar title="My Board"></Dashboard_Bar>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {columns.map((column) => (
          <Column key={column.id} title={column.title} tasks={column.tasks} />
        ))}
      </div>
    </div>
  );
};

export default Employee_Landing;
