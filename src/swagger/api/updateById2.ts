// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 更新提示词信息 PUT /auth/promet/update */
export async function updatePromet(body: API.Promet, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/promet/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
