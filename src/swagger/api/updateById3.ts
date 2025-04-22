// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 修改菜单 PUT /admin/system/sysMenu/update */
export async function updateSysMenuSystem(body: API.SysMenu, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysMenu/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
