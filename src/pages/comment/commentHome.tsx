import dayjs from 'dayjs';
import React, { useState } from 'react';

import { SendComment, CommentItem } from './components';
import styles from './commentHome.module.scss';
import { useMount } from 'ahooks';
import { createDiscussion, getDiscussionList } from 'src/services/comment';
import { getUserDetail } from 'src/services/login';
import { message } from 'antd';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

const CommentHome: React.FC = () => {
  const [commentList, setCommentList] = useState([]);
  const { userStore } = useStore();
  const { userId } = userStore;

  const getDataList = async () => {
    const { data = {} } = await getDiscussionList(1, 100);

    const { records } = data;
    // 获取用户信息
    const fullData = await Promise.all(
      records.map(async it => {
        const { data } = await getUserDetail(it.userId);
        return {
          ...data,
          ...it,
        };
      }),
    );

    setCommentList(
      (fullData || []).map(it => {
        return {
          ...it,
          author: it.name,
          avatar: it.phone,
          datetime: dayjs(it.postedAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }),
    );
  };

  const handleSendComment = async data => {
    await createDiscussion({
      ...data,
      userId,
    });
    message.success('评论成功');
    getDataList();
  };

  useMount(() => {
    getDataList();
  });

  return (
    <>
      <div className={styles['comment-page-container']}>
        <div className={styles['create-comment']}>
          <SendComment onSend={handleSendComment} />
        </div>
        <div className={styles['comment-part']}>用户精华帖</div>
        <div className={styles['comment-list-container']}>
          {(commentList || []).map(it => {
            return <CommentItem key={it.id} info={it} />;
          })}
        </div>
      </div>
    </>
  );
};

export default observer(CommentHome);
