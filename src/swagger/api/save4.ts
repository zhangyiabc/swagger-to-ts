// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 添加角色 POST /admin/system/sysRole/save */
export async function saveSysRoleSystem(body: API.SysRole, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysRole/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
