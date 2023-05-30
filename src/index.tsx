import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import "antd/dist/antd.compact.css"; // 紧凑主题
import zhCN from "antd/lib/locale/zh_CN";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; //配置
import App from "./App";
import "./index.css";
import Login from "./pages/login";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/*" element={<App/>}/>
      </Routes>
    </ConfigProvider>
  </Router>
);
