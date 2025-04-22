// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 更新Token信息 PUT /auth/token/update */
export async function updateToken(body: API.Token, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/token/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
