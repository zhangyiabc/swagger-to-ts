import React, { useCallback } from 'react';
import { Button, Input } from 'antd';
import styles from './SendComment.module.scss';

interface Props {
  // 父级id，可以没有
  id?: string | number;
  needTitle?: boolean;
  onSend: (messageInfo: { id?: string | number; title: string; content: string }) => void;
  extra?: string;
  [key: string]: any;
}

const { TextArea } = Input;
const SendComment: React.FC<Props> = props => {
  const { id, extra, needTitle = true, onSend } = props;
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleSend = useCallback(() => {
    onSend({ id, content, title });
    setContent('');
    setTitle('');
  }, [content]);

  return (
    <div className={styles['send-comment-box']}>
      {needTitle && (
        <Input
          className={styles['send-comment-title']}
          placeholder="请输入标题"
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></Input>
      )}
      <TextArea
        autoSize={{ minRows: 4, maxRows: 6 }}
        value={content}
        placeholder={extra ? `回复${extra}:` : '请输入评论内容'}
        onChange={e => setContent(e.target.value)}
      ></TextArea>
      <div className={styles['send-comment-footer']}>
        <Button type="primary" onClick={handleSend}>
          发送
        </Button>
      </div>
    </div>
  );
};

export default SendComment;
