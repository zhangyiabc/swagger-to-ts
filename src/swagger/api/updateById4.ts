// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 更新用户 PUT /admin/system/sysUser/update */
export async function updateSysUserSystem(body: API.SysUser, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysUser/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
