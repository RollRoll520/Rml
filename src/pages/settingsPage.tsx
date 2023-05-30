import React from "react";
import { Form, Input, Button, Switch, Select, Radio } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Option } = Select;

class SettingsPage extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    language: "en",
    notifications: false,
    theme: "light",
  };

  onFinish = (values: any) => {
    this.setState({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      language: values.language,
      notifications: values.notifications,
      theme: values.theme,
    });
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  onReset = () => {
    this.setState({
      name: "",
      email: "",
      phone: "",
      password: "",
      language: "en",
      notifications: false,
      theme: "light",
    });
  };

  render() {
    return (
      <div style={{ padding: "50px" }}>
        <h1>设置</h1>
        <Form
          name="basic"
          initialValues={{
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            language: this.state.language,
            notifications: this.state.notifications,
            theme: this.state.theme,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "请输入您的姓名！",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="姓名" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "请输入有效的邮箱地址！",
              },
              {
                required: true,
                message: "请输入您的邮箱地址！",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "请输入您的电话号码！",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="电话" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item name="language" label="语言">
            <Select>
              <Option value="zh">中文</Option>
              <Option value="en">英语</Option>
              <Option value="es">西班牙语</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notifications" label="通知">
            <Switch />
          </Form.Item>

          <Form.Item name="theme" label="主题">
            <Radio.Group>
              <Radio.Button value="light">浅色</Radio.Button>
              <Radio.Button value="dark">深色</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default SettingsPage;
