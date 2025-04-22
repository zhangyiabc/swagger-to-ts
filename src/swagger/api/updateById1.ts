// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 更新讨论帖信息 PUT /auth/discussion-posts/update */
export async function updateDiscussionPosts(body: API.DiscussionPosts, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/discussion-posts/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
