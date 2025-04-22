// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 保存用户 POST /admin/system/sysUser/save */
export async function saveSysUserSystem(body: API.SysUser, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysUser/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
