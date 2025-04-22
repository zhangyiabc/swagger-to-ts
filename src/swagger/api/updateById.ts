// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 更新评论信息 PUT /auth/comments/update */
export async function updateComments(body: API.Comments, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/comments/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
