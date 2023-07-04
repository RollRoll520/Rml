import {
  Card,
  Button,
  Form,
  Input,
  Table,
  Space,
  Modal,
  message,
  Popconfirm,
  Select,
  Breadcrumb,
} from "antd";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import MyUpload from "../components/MyUpload";
import { useNavigate } from "react-router-dom";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import {
  updateProductByIdAPI,
  loadProductListAPI,
  delProductByIdAPI,
  insertProductAPI,
  loadProductByIdAPI,
} from "../services/product.service";
import moment from "moment";

function ProductList() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false); // 控制modal显示和隐藏
  const [myForm] = Form.useForm(); // 可以获取表单元素实例
  const [query, setQuery] = useState(1); // 查询条件
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState(0); // 总数量
  const [currentId, setCurrentId] = useState(""); // 当前id，如果为空表示新增
  const [imageUrl, setImageUrl] = useState<string>(""); // 上传之后的数据
  const [findId, setFindId] = useState("");

  useEffect(() => {
    // 调用 loadProductListAPI 函数获取产品列表数据
    loadProductListAPI(query)
      .then((res) => {
        if (query !== 0) {
          setData(res.result.list);
          setTotal(res.result.total); // 设置总数量
          console.log(res);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]); // 监听query改变

  useEffect(() => {
    loadProductByIdAPI(findId)
      .then((res) => {
        if (findId !== "0") {
          let li = {
            p_id: res.result.p_id,
            p_type: res.result.p_type,
            p_state: res.result.p_state,
            p_time: res.result.p_time,
            p_img_url: res.result.p_img_url,
          };
          let arr = [li];
          setData(arr);
          setTotal(1); // 设置总数量
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [findId]);

  useEffect(() => {
    if (!isShow) {
      // 关闭弹窗之后重置数据
      setCurrentId("");
      setImageUrl("");
    }
  }, [isShow]);

  return (
    <>
      <Card
        title="所有档案信息"
        extra={
          <>
            <Breadcrumb>
              <BreadcrumbItem>信息管理</BreadcrumbItem>
              <BreadcrumbItem>档案信息</BreadcrumbItem>
            </Breadcrumb>
          </>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form
            layout="inline"
            onFinish={(v) => {
              message.success("查询成功");
              console.log(v);
              console.log(v.name);
              if (v.name) {
                setQuery(0);
                setFindId(v.name);
              } else {
                setFindId("0");
                setQuery(1);
              }
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
          <Table
            dataSource={data}
            rowKey="id"
            columns={[
              {
                title: "产品编号",
                width: 100,
                align: "center",
                render(v, r: any) {
                  return <>{r.p_id}</>;
                },
              },
              {
                title: "类型",
                width: 120,
                align: "center",
                render(v, r: any) {
                  return <>{r.p_type}</>;
                },
              },
              {
                title: "状态",
                width: 80,
                align: "center",
                render(v, r: any) {
                  let label;
                  if (r.p_state === "使用中") {
                    label = (
                      <>
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
                      </>
                    );
                  } else if (r.p_state === "在架上") {
                    label = (
                      <>
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
                      </>
                    );
                  } else {
                    label = (
                      <>
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
                      </>
                    );
                  }
                  return label;
                },
              },
              {
                title: "更新时间",
                width: 120,
                align: "center",
                render(v, r) {
                  return <>{r.p_time}</>;
                },
              },
              {
                title: "操作",
                align: "center",
                width: 100,
                render(v, r: any) {
                  return (
                    <Space>
                      <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                          navigate(`/admin/UsageList/${r.p_id}`); // 导航到带有 u_p_id 参数设置为 r.p_id 的 UsageList 页面
                        }}
                      />
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                          setIsShow(true);
                          setCurrentId(r.p_id);
                          setImageUrl(r.p_img_url);
                          myForm.setFieldsValue(r);
                        }}
                      />
                      <Popconfirm
                        title="是否确认删除此项?"
                        onConfirm={async () => {
                          await delProductByIdAPI(r.p_id);
                          setQuery(1); // 重新加载数据
                        }}
                      >
                        <Button
                          type="primary"
                          icon={<DeleteOutlined />}
                          size="small"
                          danger
                        />
                      </Popconfirm>
                    </Space>
                  );
                },
              },
            ]}
            // 分页
            pagination={{
              pageSize: 5,
              total, // 总数量
              // 页码改变的时候执行
              onChange(page) {
                setQuery(page);
              },
            }}
          />
        </Space>
      </Card>
      <Modal
        title="编辑"
        open={isShow}
        // 点击遮罩层时不关闭
        maskClosable={false}
        onCancel={() => setIsShow(false)}
        // 关闭modal的时候清楚数据
        destroyOnClose
        onOk={() => {
          // message.success("保存成功");
          myForm.submit(); //手动触发表单的提交事件
        }}
      >
        <Form
          // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
          preserve={false}
          onFinish={async (v) => {
            const currentTime = moment().format("YYYY-MM-DD HH:mm:ss"); // 获取当前时间并格式化为datetime字符串
            if (currentId) {
              await updateProductByIdAPI(currentId, {
                p_img_url: imageUrl,
                p_time: currentTime,
                ...v,
              }); // 修改
            } else {
              await insertProductAPI({
                p_img_url: imageUrl,
                p_time: currentTime,
                ...v,
              }); // 新增
            }

            message.success("保存成功");
            setQuery(1); // 重置查询条件，取数据
            // navigate("/admin/ProductList");

            setIsShow(false);
          }}
          // onFinishFailed={async (v) => {
          //   const currentTime = moment().format("YYYY-MM-DD HH:mm:ss"); // 获取当前时间并格式化为datetime字符串
          //   if (currentId) {
          //     await updateProductByIdAPI(currentId, {
          //       p_img_url: imageUrl,
          //       p_time: currentTime,
          //       ...v,
          //     }); // 修改
          //   } else {
          //     await insertProductAPI({
          //       p_img_url: imageUrl,
          //       p_time: currentTime,
          //       ...v,
          //     }); // 新增
          //   }

          //   message.success("保存成功");
          //   setQuery(1); // 重置查询条件，取数据
          //   // navigate("/admin/ProductList");

          //   setIsShow(false);
          // }}
          labelCol={{ span: 5 }}
          form={myForm}
        >
          <Form.Item label="产品示意图">
            <MyUpload
              imageUrl={"https://roll0814.cn:8000/" + imageUrl}
              setImageUrl={setImageUrl}
            />
          </Form.Item>

          <Form.Item
            label="产品编号"
            name="p_id"
            rules={[
              {
                required: true,
                message: "请输入产品编号",
              },
            ]}
          >
            <Input type="text" placeholder="请输入产品编号" />
          </Form.Item>
          <Form.Item
            label="产品类型"
            name="p_type"
            rules={[
              {
                required: true,
                message: "请选择产品类型",
              },
            ]}
          >
            <Select placeholder="请选择产品类型">
              <Select.Option value={"微磁"}>微磁</Select.Option>
              <Select.Option value={"近红外"}>近红外</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="产品状态"
            name="p_state"
            rules={[
              {
                required: true,
                message: "请选择产品状态",
              },
            ]}
          >
            <Select placeholder="请选择产品状态">
              <Select.Option value={"维护中"}>维护中</Select.Option>
              <Select.Option value={"使用中"}>使用中</Select.Option>
              <Select.Option value={"在架上"}>在架上</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ProductList;
