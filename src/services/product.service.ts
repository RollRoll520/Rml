import { get, post, del, put, mulPost } from "../utils/request";

/**
 * 获取产品信息列表
 * @param page
 */
export const loadProductListAPI = (page: number)=>
  get("/product/list/" + page);

/**
 * 根据id获取产品信息
 * @param id
 */
export const loadProductByIdAPI = (id: string)=>
  get("/product/find/" + id);

/**
 * 新增产品信息
 * @param data
 */
export const insertProductAPI = (data: any): Promise<any> =>
  post("/product/new", data);

/**
 * 上传产品图片
 * @param params
 * @param data
 */
export const uploadProductImageAPI = (params: any, data: any): Promise<any> =>
  mulPost("/product/upload", params, data);

/**
 * 根据id修改产品信息
 * @param id
 * @param data
 */
export const updateProductByIdAPI = (id: string, data: any): Promise<any> =>
  put("/product/update/" + id, data);

/**
 * 根据id删除产品信息
 * @param id
 */
export const delProductByIdAPI = (id: string): Promise<any> =>
  del("/product/delete/" + id);
