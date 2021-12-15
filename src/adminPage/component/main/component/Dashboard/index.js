import Chart from "react-apexcharts";
import { EllipsisOutlined } from "@ant-design/icons";

import "./style.scss";

export default function Dashboard() {
  const series = [
    {
      name: "TEAM A",
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: "TEAM B",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
      name: "TEAM C",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];
  var options = {
    chart: {
      type: "line",
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },

      colors: ["#893DD9", "#F7F8F9", "#9C27B0"],
    },
    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Points",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };

  const statisticsData = [
    {
      icon: "https://demo.dashboardpack.com/user-management-html/img/crm/businessman.svg",
      label: "Users Registrations",
      acount: 100,
    },
    {
      icon: "https://demo.dashboardpack.com/user-management-html/img/crm/customer.svg",
      label: "Total Rooms",
      acount: 100,
    },
    {
      icon: "https://demo.dashboardpack.com/user-management-html/img/crm/infographic.svg",
      label: "Total Bookings",
      acount: 100,
    },
    {
      icon: "https://demo.dashboardpack.com/user-management-html/img/crm/sqr.svg",
      label: "Total Extra Service",
      acount: 100,
    },
  ];
  return (
    <div className="dashboard-admin">
      <div className="dashboard-block1">
        <div className="chart-main">
          <Chart options={options} series={series} width={"100%"} height={"100%"} />
        </div>
        <div className="chart-statistics">
          <div className="chart-statistics-main">
            {statisticsData.map((item, index) => {
              return (
                <div className="chart-statistics-item">
                  <div className={`static-item_header static-header-${index}`}>
                    <img src={item.icon} alt="thumb" />
                    <EllipsisOutlined />
                  </div>
                  <div className="static-item_content">
                    <h1>{item.acount}</h1>
                    <h3>{item.label}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chart-statistics-abs"></div>
        </div>
      </div>
    </div>
  );
}
