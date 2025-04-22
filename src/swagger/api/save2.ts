// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 保存提示词信息 POST /auth/promet/save */
export async function savePromet(body: API.Promet, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/promet/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
