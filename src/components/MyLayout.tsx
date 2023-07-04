import {
  BarsOutlined,
  FormOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { defaultImg as logo } from "../utils/tools";
import React, { useState } from "react";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Sider, Content } = Layout;

const rootSubmenuKeys = ["sub1", "sub3", "sub4"];

const MyLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
      }}
      id="components-layout-demo-custom-trigger"
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="正畸加速器信息管理系统" />
        </div>
        {!collapsed && ( // 当Slider处于展开状态时才显示div
          <div
            style={{
              textAlign: "center", // 居中对齐
              height: "5vh",
            }}
          >
            你好 <SmileTwoTone twoToneColor={"pink"} /> 管理员
            <span
              onClick={() => {
                // console.log('退出');
                navigate("/");
              }}
              style={{
                marginLeft: "10px",
                color: "#f5222d", // 设置颜色为红色
                cursor: "pointer",
                transition: "color 0.3s ease-in-out", // 添加过渡效果
              }}
            >
              [退出]
            </span>
          </div>
        )}
        <Menu
          theme="light"
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={["1"]}
        >
          <SubMenu key="sub1" icon={<InfoCircleOutlined />} title="信息管理">
            <Menu.Item key="1" icon={<BarsOutlined />}>
              <Link to="ProductList">档案信息</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined />}>
              <Link to="InfoInput">信息录入</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sub3" icon={<SearchOutlined />}>
            <Link to="UsageList/0/top">信息查询</Link>
          </Menu.Item>
          <Menu.Item key="sub4" icon={<SettingOutlined />}>
            <Link to="Settings">其他设置</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span className="app-title">正畸加速器信息管理系统</span>
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <span
                      onClick={() => {
                        // console.log('退出');
                        navigate("/");
                      }}
                    >
                      退出
                    </span>
                  ),
                  key: "logOut",
                },
              ],
            }}
          >
            <img
              src={logo}
              alt="admin"
              style={{
                width: "30px",
                borderRadius: "50%",
                float: "right",
                marginTop: "16px",
                marginRight: "20px",
              }}
            />
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
