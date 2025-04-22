// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 为用户分配角色 POST /admin/system/sysRole/doAssign */
export async function doAssignSysRoleSystem(body: API.AssginRoleVo, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysRole/doAssign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
