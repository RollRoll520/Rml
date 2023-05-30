import { Descriptions, Divider, Image, List } from "antd";
import React, { useEffect, useState } from "react";
import { findUsageByIdAPI } from "../services/usage.service";
import { useParams } from "react-router-dom";
import { serverUrl } from "../utils/tools";
import { loadProductByIdAPI } from "../services/product.service";


const Document = () => {
  const { u_id } = useParams<{ u_id: string }>();

  const [usage, setUsage] = useState<any>({});
  const [productImg,setProductImg] = useState<any>({});

  useEffect(() => {
    if(u_id){
    const fetchData = async () => {
      try {
        const res = await findUsageByIdAPI(u_id);
        setUsage(res);
        const res2 = await loadProductByIdAPI(res.u_p_id);
        setProductImg(res2.result.p_img_url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }
  }, [u_id]);

  return (
    <>
      <Divider
        style={{
          fontSize: "2em",
          fontWeight: "bolder",
        }}
      >
        正畸加速器
        <br />
        使用档案
      </Divider>
      <Descriptions
        title="基本信息"
        bordered
        // layout="vertical"
        labelStyle={{
          backgroundColor: "#f5f5f5",
        }}
        style={{
          paddingBottom: "10px",
        }}
      >
        <Descriptions.Item label="姓名" span={1}>
          {usage?.u_name}
        </Descriptions.Item>
        <Descriptions.Item label="性别" span={1}>
          {usage?.u_sex}
        </Descriptions.Item>
        <Descriptions.Item label="年龄" span={1}>
          {usage?.u_age}
        </Descriptions.Item>
        <Descriptions.Item label="第一次就诊时间" span={2}>
          {usage?.u_first}
        </Descriptions.Item>
        <Descriptions.Item label="上一次就诊时间" span={2}>
          {usage?.u_last}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="影像学资料"
        bordered
        layout="vertical"
        labelStyle={{
          backgroundColor: "#f5f5f5",
        }}
        style={{
          paddingBottom: "10px",
        }}
      >
        <Descriptions.Item label="图片预览">
          <Image
            width={300}
            src="https://roll0814.cn/ftp-images/zja/ziliao.png"
          />
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="加速器使用体验"
        bordered
        layout="vertical"
        column={1}
        labelStyle={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Descriptions.Item label="请问你有出现以下不适吗？">
          <List bordered>
            <List.Item
              style={{
                color: "#00d6f9",
                backgroundColor: "rgba(85, 158, 255,0.3)",
              }}
            >
              A牙齿松动
            </List.Item>
            <List.Item>B牙齿疼痛</List.Item>
            <List.Item>C口腔黏膜不适</List.Item>
            <List.Item>D口腔黏膜溃烂、溃疡</List.Item>
            <List.Item>E嘴唇麻木</List.Item>
            <List.Item>F无</List.Item>
            <List.Item>G其他</List.Item>
          </List>
        </Descriptions.Item>
        <Descriptions.Item label="出现症状的时长/天">10</Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="加速器使用方案"
        bordered
        layout="vertical"
        labelStyle={{
          backgroundColor: "#f5f5f5",
        }}
        style={{
          paddingBottom: "10px",
        }}
      >
        <Descriptions.Item label="方案图">
          {/* <Image width={300} src={serverUrl + usage?.u_plan_url} /> */}
          <Image
            width={300}
            src="https://roll0814.cn/ftp-images/zja/fangan1.png"
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Document;
