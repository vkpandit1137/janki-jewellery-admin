import { Button, Card, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import UploadImage from "../../components/upload";
import "./index.css";

const AddCategory = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  function onReset() {
    form.resetFields();
  }
  const onFinish = (values) => {
    console.log(values);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image_file", file);
    });
    formData.append("title", values.title);
    formData.append("priority", values.priority);
    fetch("http://localhost:5001/admin/categories/add", {
      method: "POST",
      crossDomain: true,
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.status, "status");
        if (data.status == "ok") {
          message.success("Added Category Succesfully.");
          onReset();
          // window.location.reload();
        } else {
          message.error(data.error);
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
    console.log("Failed:", errorInfo);
  };

  const getFile = (file) => {
    console.log(file);
    setFileList(file);
  };
  return (
    <div>
      <div className="d-block">
        <h2 className="section-title">Add Category</h2>
      </div>
      <Card title="Add Category" className="attribute-container">
        <Form
          form={form}
          name={"add_category"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={24}>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Title"
                name={"title"}
                rules={[
                  { required: true, message: "Please input category title!" },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={12} md={12} xs={24}>
              <Form.Item
                label="Priority Order"
                name={"priority"}
                rules={[
                  {
                    required: true,
                    message: "Please input category priority!",
                  },
                ]}
              >
                <Input placeholder="Priority Order" />
              </Form.Item>
            </Col>
          </Row>
          <UploadImage getFile={getFile} maxCount={1} />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddCategory;
