// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 保存评论信息 POST /auth/comments/save */
export async function saveComments(body: API.Comments, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/comments/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
