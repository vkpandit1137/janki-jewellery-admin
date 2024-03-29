import { Card, message, Rate, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const Customers = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date Created",
      dataIndex: "date",
    }
  ];

  const getCustomers = useCallback(async () => {
    fetch("http://localhost:5001/admin/customers", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "results");
        if (result.status == "ok") {
          setDataSource(result.data);
        } else {
          message.error("Error fetching the customers");
        }
      });
  }, []);

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Customers</h2>
        <p className="section-lead">
          You have total {dataSource.length} Customers
        </p>
      </div>
      <Card title="Customers" className="main-attr-container">
        <Table columns={columns} dataSource={dataSource} />
      </Card>
    </div>
  );
};
export default Customers;
