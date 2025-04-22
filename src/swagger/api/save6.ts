// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 保存Token信息 POST /auth/token/save */
export async function saveToken(body: API.Token, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/token/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
