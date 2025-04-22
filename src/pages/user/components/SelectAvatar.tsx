import React from 'react';
import { v1 } from 'uuid';
import styles from './selectAvatar.module.scss';

import { ReloadOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Avatar } from 'src/components';

interface Props {
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  [key: string]: any;
}

const SelectAvatar: React.FC<Props> = props => {
  const { value, disabled = false, onChange } = props;
  const [spin, setSpin] = React.useState(false);

  const handleReload = () => {
    setSpin(true);
    setTimeout(() => {
      const mockData = v1();

      onChange?.(mockData.substring(1, 11));
      setSpin(false);
    }, 1000);
  };

  return (
    <div className={styles['select-avatar']}>
      <Avatar name={value} />
      {!disabled && (
        <Tooltip title="换个头像">
          <ReloadOutlined spin={spin} className={styles['reload-icon']} onClick={handleReload} />
        </Tooltip>
      )}
    </div>
  );
};

export default SelectAvatar;
