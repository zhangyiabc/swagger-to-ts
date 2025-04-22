import React from 'react';
import { useAntdTable } from 'ahooks';
import { Modal, Button, Table, Form, Input, message } from 'antd';
import { getTokenList, createToken, updateToken } from 'src/services/token';
import { getToken } from 'src/swagger/api/index4';
import styles from './token.module.scss';

interface Props {
  [key: string]: any;
}

interface Result {
  total: number;
  list: any[];
}
const getTableData = async ({ current, pageSize }): Promise<Result> => {
  const { data } = await getToken({
    page: current,
    limit: pageSize,
  });
  const { total, records } = data;
  return Promise.resolve({
    total: total,
    list: records,
  });
};

const Token: React.FC<Props> = () => {
  const { tableProps, refresh } = useAntdTable(getTableData);
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState<any>({});
  const [type, setType] = React.useState<'add' | 'edit'>('add');
  const [form] = Form.useForm();
  const columns = [
    {
      title: '名称',
      dataIndex: 'tokenName',
      key: 'tokenName',
    },

    {
      title: 'token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <>
            <Button type="primary" onClick={() => handleEdit(record)}>
              编辑
            </Button>
          </>
        );
      },
    },
  ];

  const handleEdit = (data: any) => {
    // 编辑
    setType('edit');
    setCurrent(data);
    setVisible(true);
    form.setFieldsValue(data);
  };

  const handleOk = () => {
    form.validateFields().then(async values => {
      if (type === 'add') {
        await createToken({
          ...values,
        });
        message.success('提交成功');
      } else {
        // 编辑
        await updateToken({
          ...values,
          id: current.id,
        });
        message.success('编辑成功');
      }
      setVisible(false);
      refresh();
    });
  };

  const renderExtra = () => {
    return (
      <>
        {visible && (
          <Modal
            title={type === 'add' ? '新增token' : '编辑token'}
            onOk={handleOk}
            open={visible}
            onCancel={() => setVisible(false)}
          >
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Form.Item rules={[{ required: true }]} label="名称" name="tokenName">
                <Input placeholder="请输入名称" />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="token" name="token">
                <Input.TextArea placeholder="请输入token" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </>
    );
  };

  return (
    <div className={styles['token-wrapper']}>
      <div className={styles['token-header']}>
        <div className={styles['token-filter']}>token管理</div>
        <Button
          type="primary"
          onClick={() => {
            setType('add');
            setVisible(true);
          }}
        >
          新增token
        </Button>
      </div>
      <div className={styles['token-table']}>
        <Table columns={columns} rowKey="id" style={{ overflow: 'auto' }} {...tableProps} />
      </div>
      {renderExtra()}
    </div>
  );
};

export default Token;
