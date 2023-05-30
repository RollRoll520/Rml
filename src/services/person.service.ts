import { get, post, del, put, mulPost } from '../utils/request';

/**
 * 获取人员信息列表
 * @param query
 */
export const loadDataAPI = (query: number) =>
  get('/person/'+ query);


/**
 * 新增
 * @param data
 */
export const insertAPI = (data: any) =>
  post('/person', data);

/**
 * 上传图片
 * @param data
 */
export const uploadAPI = (params:any,data: any) =>
  mulPost('/person/upload', params,data);

/**
 * 根据id修改
 * @param id
 * @param data
 */
export const updateByIdAPI = (id: string, data: any) =>
  put('/person/' + id, data);

/**
 * 根据id删除
 * @param id
 */
export const delByIdAPI = (id: string) =>
  del('/person/' + id);


