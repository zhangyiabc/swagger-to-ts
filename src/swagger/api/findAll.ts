// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 查询所有角色 GET /admin/system/sysRole/findAll */
export async function getFindAllSysRoleSystem(options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysRole/findAll`, {
    method: 'GET',
    ...(options || {}),
  });
}
