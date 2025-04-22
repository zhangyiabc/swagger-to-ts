import React from 'react';
import { HighlightOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
  author?: React.ReactNode;
  title?: React.ReactNode;
  avatar?: React.ReactNode;
  content?: React.ReactNode;
  showReply?: boolean;
  datetime?: React.ReactNode;
  footer?: React.ReactNode;
  onAction?: (action: string) => void; // 回复、点赞等操作
}

const Comment: React.FC<Props> = props => {
  const { author, showReply = false, title, avatar, content, datetime, onAction, children } = props;

  return (
    <div className={styles['comment-box-wrapper']}>
      <div className={styles['comment-wrapper']}>
        <div className={styles['comment-left']}>
          <div className={styles['comment-avatar']}>{avatar}</div>
        </div>
        <div className={styles['comment-right']}>
          <div className={styles['comment-header']}>
            <span className={styles.author}>{author}</span>
            {title && <span className="common-title">{title}</span>}
            <span className={styles.time}>{datetime}</span>
          </div>
          <div className={styles['comment-content']}>{content}</div>
          {showReply && (
            <div className={styles['comment-action']}>
              <HighlightOutlined />
              <span onClick={() => onAction('reply')} className={styles['comment-basic-reply-to']}>
                回复
              </span>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Comment;
