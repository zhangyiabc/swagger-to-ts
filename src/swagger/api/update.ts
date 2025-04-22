// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 修改角色 PUT /admin/system/sysRole/update */
export async function updateSysRoleSystem(body: API.SysRole, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysRole/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
