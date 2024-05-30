import React from "react";
import LineChart from "../AllCharts/chartjs/linechart"
const Dashboard = () => {

  return (
    <React.Fragment>
      <div
        className="page-content  server-management"
      >
        <div className="container-fluid"> 
        <LineChart />  
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Dashboard);
