import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
  Checkbox,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/auth.service";
import { defaultImg } from "../utils/tools";
import FormItem from "antd/es/form/FormItem";
import { useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRemember(true);
    }
  }, []); // 只在组件挂载时执行

  return (
    <div
      style={{
        backgroundImage: "url(https://roll0814.cn/ftp-images/zja/home.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Row>
        <Col
          md={{
            span: 8,
            push: 8,
          }}
          xs={{
            span: 22,
            push: 1,
          }}
        >
          <img
            src={defaultImg}
            alt=""
            style={{
              display: "block",
              margin: "55px auto 30px auto",
              borderRadius: "16px",
              width: "140px",
            }}
          />
          <Card
            title="正畸加速器信息管理系统"
            headStyle={{
              fontSize: "20px",
              fontFamily: "cursive",
              textAlign: "center", // 居中对齐
            }}
            style={{
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              opacity: "0.95", // 设置透明度为0.8
            }}
          >
            <Form
              labelCol={{
                md: {
                  span: 4,
                },
              }}
              onFinish={async (values) => {
                try {
                  const res = await loginAPI(values);
                  if (!res) console.log("no res");

                  if (res && res.code === 0) {
                    message.success("登录成功");
                    if (remember) {
                      localStorage.setItem("username", values.a_username);
                      localStorage.setItem("password", values.a_password);
                    } else {
                      localStorage.removeItem("username");
                      localStorage.removeItem("password");
                    }
                    navigate("/admin/ProductList");
                  }
                } catch (err) {
                  console.log(err);
                  message.error("登录失败，请确认账号或密码是否输入正确");
                }
              }}
            >
              <Form.Item
                label="用户名"
                name="a_username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名",
                  },
                ]}
                style={{
                  paddingLeft: "3vw",
                }}
              >
                <Input
                  placeholder="请输入用户名"
                  style={{
                    width: "20vw",
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="密码"
                name="a_password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码",
                  },
                ]}
                style={{
                  paddingLeft: "3vw",
                }}
              >
                <Input.Password
                  placeholder="请输入密码"
                  style={{
                    width: "20vw",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <FormItem>
                <Space
                  style={{
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{
                        display: "block",
                        width: "10vw",
                        alignSelf: "center",
                      }}
                    >
                      登录
                    </Button>
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    >
                      记住密码
                    </Checkbox>
                  </Form.Item>
                </Space>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
