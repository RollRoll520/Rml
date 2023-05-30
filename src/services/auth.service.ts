import { post } from '../utils/request';

type LoginData = {
  a_username: string;
  a_password: string;
};

/**
 * 管理后台登录接口
 * @param data
 * @returns
 */
export const loginAPI = (data: LoginData) => post('/admin/login', data);
