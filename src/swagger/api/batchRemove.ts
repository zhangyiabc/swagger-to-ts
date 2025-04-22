// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 批量删除 DELETE /admin/system/sysRole/batchRemove */
export async function batchRemoveSysRoleSystem(body: number[], options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysRole/batchRemove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
