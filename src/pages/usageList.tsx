import { Card, Table, Image, Button, Input, Form, message } from "antd";
import { useEffect, useState } from "react";
import { findUsagesByPIdAPI } from "../services/usage.service";
import { Link, useParams } from "react-router-dom";
import { loadProductByIdAPI } from "../services/product.service";
import { serverUrl } from "../utils/tools";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  ProfileOutlined,
  SearchOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function UsageList() {
  const navigate = useNavigate();
  const { u_p_id, isTop } = useParams<{ u_p_id: string; isTop: string }>();
  const [data, setData] = useState([]);
  const [productImg, setProductImg] = useState<any>({});
  const [productState, setProductState] = useState<any>({});

  useEffect(() => {
    if (u_p_id && u_p_id !== "0") {
      // Call the findUsagesByPIdAPI function to get the usage list data
      findUsagesByPIdAPI(u_p_id)
        .then((res) => {
          console.log(res.length);
          if (res.length !== 0) {
            if(isTop)
            message.success("查询成功！");
            setData(res);
            loadProductByIdAPI(u_p_id).then((res) => {
              setProductImg(res.result.p_img_url);
              setProductState(res.result.p_state);
            });
          } else {
            if (isTop) message.error("查询失败！");
            setProductImg(null);
            setProductState("");
            setData([]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setProductImg(null);
      setProductState("");
      setData([]);
    }
  }, [u_p_id]);

  return (
    <>
      <div
        style={{ padding: "0", marginBottom: "10px", display: "inline-block" }}
      >
        {isTop !== "top" && (
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate(-1); // 返回上一页
            }}
          >
            返回
          </Button>
        )}
      </div>
      {isTop === "top" && (
        <Form
          layout="inline"
          onFinish={(v) => {
            console.log(v);
            navigate(`/admin/UsageList/${v.name}/top`); // 导航到带有 u_p_id 参数设置为 r.p_id 的 UsageList 页面
          }}
        >
          <Form.Item label="查询产品" name="name">
            <Input placeholder="请输入产品编号" allowClear />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              icon={<SearchOutlined />}
            />
          </Form.Item>
        </Form>
      )}
      <Card title="使用情况信息列表">
        <Card.Grid style={{ width: "25%", textAlign: "center" }}>
          <>产品编号：</>{" "}
          {u_p_id !== "0" && productImg !== null && (
            <>
              {u_p_id}
              <Image
                width={"auto"}
                src={"https://roll0814.cn:8000/" + productImg}
                style={{ paddingBottom: "5px" }}
              />
            </>
          )}
          {productState === "在架上" && (
            <div
              style={{
                color: "#0e700e",
                lineHeight: "15px",
                fontSize: "15px",
              }}
            >
              <CheckCircleFilled
                style={{
                  color: "#0e700e",
                  paddingRight: "10px",
                }}
              />
              在架上
            </div>
          )}
          {productState === "使用中" && (
            <div
              style={{
                color: "#007acc",
                lineHeight: "15px",
                fontSize: "15px",
              }}
            >
              <ClockCircleFilled
                style={{
                  color: "#007acc",
                  paddingRight: "10px",
                }}
              />
              使用中
            </div>
          )}
          {productState === "维护中" && (
            <div
              style={{
                color: "#ff0000",
                lineHeight: "15px",
                fontSize: "15px",
              }}
            >
              <StopOutlined
                style={{
                  color: "#ff0000",
                  paddingRight: "10px",
                }}
              />
              维护中
            </div>
          )}
        </Card.Grid>
        <Card.Grid style={{ width: "75%", textAlign: "center" }}>
          <Table
            dataSource={data}
            rowKey="u_id"
            columns={[
              {
                title: "患者姓名",
                dataIndex: "u_name",
                key: "u_name",
                width: 160,
                align: "center",
                render(v, r: any) {
                  return <>{r.u_name}</>;
                },
              },
              {
                title: "使用频次",
                dataIndex: "u_age",
                key: "u_age",
                width: 120,
                align: "center",
                render(v, r: any) {
                  return <>12</>;
                },
              },
              {
                title: "最近使用时间",
                dataIndex: "u_last",
                key: "u_last",
                width: 200,
                align: "center",
                render(v, r: any) {
                  return <>{r.u_last}</>;
                },
              },
              {
                title: "操作",
                dataIndex: "operate",
                key: "u_operate",
                width: 180,
                align: "center",
                render(v, r: any) {
                  return (
                    <Button
                      type="primary"
                      icon={<ProfileOutlined />}
                      onClick={() => {
                        navigate(`/admin/Document/${r.u_id}`); // 导航到带有 u_p_id 参数设置为 r.p_id 的 UsageList 页面
                      }}
                    >
                      查看患者详情
                    </Button>
                  );
                },
              },
            ]}
          />
        </Card.Grid>
      </Card>
    </>
  );
}

export default UsageList;
