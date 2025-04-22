// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 角色分配菜单 POST /admin/system/sysMenu/doAssign */
export async function doAssignSysMenuSystem(body: API.AssginMenuVo, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/sysMenu/doAssign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
