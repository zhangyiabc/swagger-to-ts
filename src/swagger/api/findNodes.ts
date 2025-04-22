// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 菜单列表 GET /admin/system/sysMenu/findNodes */
export async function getFindNodesSysMenuSystem(options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysMenu/findNodes`, {
    method: 'GET',
    ...(options || {}),
  });
}
