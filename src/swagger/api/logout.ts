// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** logout POST /admin/system/index/logout */
export async function logoutIndexSystem(options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/index/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}
