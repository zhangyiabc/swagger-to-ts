import request from 'src/utils/request';

export async function getDiscussionList(page: number, limit: number) {
  return request(`/api/auth/discussion-posts/${page}/${limit}`);
}

interface CreateDiscussion {
  userId: number;
  title: string;
  content: string;
}

export async function createDiscussion(body: CreateDiscussion) {
  return request(`/api/auth/discussion-posts/save`, {
    method: 'POST',
    data: JSON.stringify(body),
  });
}

// 获取文章下评论
export async function getComment4Discussion(discussionId: number) {
  return request(`/api/auth/discussion-posts/get/${discussionId}`);
}

export async function createComment(body: { discussionPostId: number; content: string; userId: number | string }) {
  return request(`/api/auth/comments/save`, {
    method: 'POST',
    data: JSON.stringify(body),
  });
}
