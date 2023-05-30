/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import { uploadProductImageAPI } from "../services/product.service";
import { mulPost } from "../utils/request";
import { dalImg, uploadActionUrl } from "../utils/tools";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

type MyUploadProps = {
  imageUrl: string;
  setImageUrl: any;
};

const MyUpload = ({ imageUrl, setImageUrl }: MyUploadProps) => {
  const [loading, setLoading] = useState(false); // 加载状态

  // 在上传进度改变的时候执行
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    // 完成
    if (info.file.status === "done") {
      setLoading(false);
      setImageUrl(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //自定义上传动作
  const uploadHeadImg = (info: any) => {
    let params = new FormData();
    params.append("file", info.file);
    uploadProductImageAPI(params, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res: any) => {
      info.onSuccess(res, info.file);
      setImageUrl(res.result.person_img);
    });
  };

  return (
    <Upload
      // name 表示服务器端接口接收的数据的属性名
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // action 表示服务器端的文件上传接口地址
      action={uploadActionUrl}
      maxCount={1}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={uploadHeadImg}//使用自定义上传动作
    >
      {imageUrl ? (
        <img src={dalImg(imageUrl)} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default MyUpload;
