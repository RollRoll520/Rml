import { get, post, del, put } from "../utils/request";

/**
 * 创建使用情况信息
 * @param data
 */
export const createUsageAPI = (data: any): Promise<any> =>
  post("/usage/new", data);

/**
 * 根据u_p_id查找使用情况信息
 * @param u_p_id
 */
export const findUsagesByPIdAPI = (u_p_id: string): Promise<any> =>
  get("/usage/findUsages/" + u_p_id);

/**
 * 根据id查找使用情况信息
 * @param id
 */
export const findUsageByIdAPI = (id: string): Promise<any> =>
  get("/usage/findOne/" + id);

/**
 * 根据id删除使用情况信息
 * @param id
 */
export const deleteUsageByIdAPI = (id: string): Promise<any> =>
  del("/usage/delete/" + id);

/**
 * 根据id更新使用情况信息
 * @param id
 * @param data
 */
export const updateUsageByIdAPI = (id: string, data: any): Promise<any> =>
  put("/usage/update/" + id, data);

/**
 * 根据姓名查找使用情况信息
 * @param name
 */
export const findUsageByNameAPI = (name: string): Promise<any> =>
  get("/usage/findByName/" + name);
