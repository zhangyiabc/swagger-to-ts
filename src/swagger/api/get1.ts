// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 根据讨论贴ID获取讨论帖信息以及评论信息 GET /auth/discussion-posts/get/${param0} */
export async function getGetDiscussionPosts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGetDiscussionPostsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/auth/discussion-posts/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
