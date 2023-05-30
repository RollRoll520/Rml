import { Button, Form, Input, Select, message } from "antd";
import MyUpload from "../components/MyUpload";
import { useState } from "react";
import { insertProductAPI } from "../services/product.service";
import moment from "moment";

const InfoInput = ({ children }: any) => {
  const [myForm] = Form.useForm(); // 可以获取表单元素实例

  
  const [imageUrl, setImageUrl] = useState<string>(""); // 上传之后的数据
  
  return (
    <Form
      // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
      preserve={false}
      onFinish={async (v) => {
        const currentTime = moment().format("YYYY-MM-DD HH:mm:ss"); // 获取当前时间并格式化为datetime字符串

        await insertProductAPI({
          p_img_url: imageUrl,
          p_time: currentTime,
          ...v,
        }); // 新增
        message.success("新建成功");
      }}
      labelCol={{ span: 5 }}
      form={myForm}
    >
      <Form.Item label="产品示意图">
        <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
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
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InfoInput;
