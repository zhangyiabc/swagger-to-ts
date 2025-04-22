import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { updateUserInfo } from 'src/services/login';
import styles from './user.module.scss';

import { SelectAvatar, TextForm } from './components';

import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

interface Props {
  [key: string]: any;
}

const User: React.FC<Props> = props => {
  const { userStore } = useStore();
  const { phone, name, userId, getUserInfo } = userStore;
  const [disabled, setDisabled] = useState(true);

  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(async (values: any) => {
      await updateUserInfo({
        ...values,
        id: userId,
      });
      await getUserInfo();
      message.success('更新成功');
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      name,
      phone: phone,
    });
  }, [name, phone]);

  return (
    <div className={styles['user-wrapper']}>
      <div className={styles['user-header']}>
        <div className={styles['header-prefix']}>我的信息</div>
        <div className={styles['header-suffix']} onClick={() => setDisabled(!disabled)}>
          {disabled ? (
            <Button type="primary" icon={<EditOutlined />}>
              编辑
            </Button>
          ) : (
            <Button onClick={handleSave} type="primary" icon={<CheckCircleOutlined />}>
              保存
            </Button>
          )}
        </div>
      </div>
      <div className="user-content">
        <Form layout="horizontal" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
          <Form.Item name={'name'} label="昵称">
            {disabled ? <TextForm /> : <Input placeholder="请输入昵称"></Input>}
          </Form.Item>
          <Form.Item name={'phone'} label="我的头像">
            <SelectAvatar disabled={disabled} />
          </Form.Item>
          <Form.Item name={'password'} label="我的密码">
            {disabled ? '*******' : <Input placeholder="请输入密码"></Input>}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(User);
