import React from 'react';
import { Layout, Spin } from 'antd';
import { useMount } from 'ahooks';
import { Header } from 'src/layout';
import { Provider } from 'mobx-react';
import { Outlet } from 'react-router';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

import './App.scss';

const { Header: LayoutHeader, Content } = Layout;
const App: React.FC = () => {
  const { commonStore, userStore } = useStore();
  const { getUserInfo } = userStore;
  const { animating } = commonStore;

  useMount(() => {
    getUserInfo();
  });

  return (
    <>
      <Provider store={useStore()}>
        <Spin spinning={animating}>
          <Layout>
            <LayoutHeader className="page-header">
              <Header />
            </LayoutHeader>
            <Content className="page-content">
              <Outlet />
            </Content>
          </Layout>
        </Spin>
      </Provider>
    </>
  );
};

export default observer(App);
