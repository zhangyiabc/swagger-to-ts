// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** login POST /admin/system/index/login */
export async function loginIndexSystem(body: API.LoginVo, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/index/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
