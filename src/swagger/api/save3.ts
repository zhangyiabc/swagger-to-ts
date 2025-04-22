// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 新增菜单 POST /admin/system/sysMenu/save */
export async function saveSysMenuSystem(body: API.SysMenu, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysMenu/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
