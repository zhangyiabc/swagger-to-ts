// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 保存讨论帖信息 POST /auth/discussion-posts/save */
export async function saveDiscussionPosts(body: API.DiscussionPosts, options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/auth/discussion-posts/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
