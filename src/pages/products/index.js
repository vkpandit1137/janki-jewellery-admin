import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, message, Popconfirm, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Products = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "product_name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <div
           className="flex-evenly"
           >
            <Link to={"/products/single/"+record.id} className="dlt-btn"><EyeOutlined /></Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a className="dlt-btn"><DeleteOutlined /></a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const handleDelete = (id) => {
    fetch("http://localhost:5001/admin/products/delete", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Deleted Product Succesfully.");
          const newData = dataSource.filter((item) => item.id !== id);
          setDataSource(newData);
        } else {
          message.error("Error deleting the product");
        }
      });
  };

  const getProducts = useCallback( async() => {
    fetch("http://localhost:5001/admin/products/view", {
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
          message.error("Error deleting the attributes");
        }
      });
  },[]);

  useEffect(() => {
    getProducts();
  },[]);

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">All Products</h2>
        <p className="section-lead">You have total {dataSource.length} Products</p>
      </div>
      <Card title="Products" className="main-attr-container">
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </div>
  );
};
export default Products;
