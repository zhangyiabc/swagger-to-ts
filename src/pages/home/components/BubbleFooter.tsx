import React, { useState } from 'react';
import { message, Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import styles from './BubbleFooter.module.scss';

interface Props {
  [key: string]: any;
}

const BubbleFooter: React.FC<Props> = () => {
  const [action, setAction] = useState<'up' | 'down' | undefined>();

  const handleClick = (type: 'up' | 'down') => {
    if (type !== action) {
      message.success('感谢您的反馈～');
      setAction(type);
    }
  };

  return (
    <div className={styles['footer-wrapper']}>
      <Tooltip title="喜欢">
        <LikeOutlined
          className={`${styles['footer-up']} ${action === 'up' ? styles.active : ''}`}
          onClick={() => handleClick('up')}
        />
      </Tooltip>
      <Tooltip title="不喜欢">
        <DislikeOutlined
          className={`${styles['footer-down']} ${action === 'down' ? styles.active : ''}`}
          onClick={() => handleClick('down')}
        />
      </Tooltip>
    </div>
  );
};

export default BubbleFooter;
