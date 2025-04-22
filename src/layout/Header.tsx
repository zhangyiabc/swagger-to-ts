import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { useMount } from 'ahooks';
import { Avatar } from 'src/components';
import { useNavigate, useLocation } from 'react-router';
import styles from './header.module.scss';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

interface Props {
  [key: string]: any;
}

const Header: React.FC<Props> = props => {
  const { userStore } = useStore();
  const { name, phone } = userStore;
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [selectMenus, setSelectMenus] = useState([]);
  const items1: MenuProps['items'] = [
    {
      key: '/comment',
      label: '精华帖',
    },
    {
      key: '/token',
      label: '我的token',
    },
    {
      key: '/prompt',
      label: '个性化模型',
    },
    {
      key: '/user',
      label: '个人中心',
    },
  ];

  const handleToHome = () => {
    setSelectMenus([]);
    navigate('/');
  };

  const logoNode = (
    <div className={styles.logo} onClick={handleToHome}>
      <img
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
        draggable={false}
        alt="logo"
      />
      <span>学习助手</span>
    </div>
  );

  const handleNavClick = data => {
    navigate(data.key);
    setSelectMenus([data.key]);
  };

  useMount(() => {
    setSelectMenus([routerLocation.pathname]);
  });

  return (
    <>
      <div className={styles['header-wrapper']}>
        <div className={styles['header-left']}>{logoNode}</div>
        <div className={styles['header-content']}>
          <Menu
            selectedKeys={selectMenus}
            mode="horizontal"
            onClick={handleNavClick}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        <div className={styles['header-right']}>
          <div className={styles['header-user']}>
            <span className={styles['header-user-name']}>{name}</span>
            <Avatar name={phone} />
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Header);
