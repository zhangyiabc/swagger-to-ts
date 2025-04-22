import { useMount } from 'ahooks';
import { message, Tooltip } from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Avatar, Comment } from 'src/components';
import { createComment, getComment4Discussion } from 'src/services/comment';
import { getUserDetail } from 'src/services/login';
import { useStore } from 'src/stores';
import { getTimeDifference } from 'src/utils';
import styles from './CommentItem.module.scss';
import SendComment from './SendComment';

interface Props {
  info: any;
  [key: string]: any;
}

const CommentItem: React.FC<Props> = props => {
  const { userStore } = useStore();
  const { userId } = userStore;
  const { info } = props;

  const [showReply, setShowReply] = useState(false);
  const [activeComment, setActiveComment] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const handleAction = (action: string, item: any) => {
    setShowReply(true);
    setActiveComment(item);
  };

  const fetchComment = async () => {
    const { data } = await getComment4Discussion(info.id);

    const resData = JSON.parse(data);

    const { CommentsList } = resData;
    const fullData = await Promise.all(
      (CommentsList || []).map(async it => {
        const { data } = await getUserDetail(it.userId);
        return {
          ...it,
          avatar: data.phone,
          author: data.name,
          datetime: it.createTime,
        };
      }),
    );
    setCommentList(fullData);
  };

  const handleSendComment = async data => {
    await createComment({
      discussionPostId: data.id,
      content: data.content,
      userId,
    });
    message.success('评论成功');
    fetchComment();
  };

  useMount(() => {
    // 获取下面的评论
    fetchComment();
  });

  return (
    <div className={styles['comment-list-container']}>
      <Comment
        showReply
        author={info.author}
        title={info.title}
        avatar={<Avatar name={info.avatar} />}
        content={info.content}
        onAction={action => handleAction(action, info)}
        datetime={
          <Tooltip title={info.datetime}>
            <span>{getTimeDifference(info.datetime)}</span>
          </Tooltip>
        }
      >
        {showReply && (
          <div className={styles['comment-reply']}>
            <SendComment needTitle={false} id={info.id} extra={activeComment.author} onSend={handleSendComment} />
          </div>
        )}
        {!_.isEmpty(commentList) && (
          <>
            {commentList.map(it => {
              return (
                <Comment
                  key={`comment-${it.id}`}
                  title={null}
                  author={it.author}
                  avatar={<Avatar name={it.avatar} />}
                  content={it.content}
                  datetime={
                    <Tooltip title={it.datetime}>
                      <span>{getTimeDifference(it.datetime)}</span>
                    </Tooltip>
                  }
                />
              );
            })}
          </>
        )}
      </Comment>
    </div>
  );
};

export default observer(CommentItem);
