// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 讨论帖条件分页查询 GET /auth/discussion-posts/${param1}/${param0} */
export async function getDiscussionPosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDiscussionPostsParams,
  options?: { [key: string]: any },
) {
  const { limit: param0, page: param1, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/auth/discussion-posts/${param1}/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
