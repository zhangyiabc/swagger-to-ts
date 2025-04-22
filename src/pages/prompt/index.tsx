import { useAntdTable } from 'ahooks';
import { Modal, Form, Input, message, Table, Button } from 'antd';

import React from 'react';
import { getPromptList, createPrompt, updatePrompt } from 'src/services/prompt';
import styles from './index.module.scss';

interface Props {
  [key: string]: any;
}

interface Result {
  total: number;
  list: any[];
}
const getTableData = async ({ current, pageSize }): Promise<Result> => {
  const { data } = await getPromptList({
    page: current,
    limit: pageSize,
  });
  const { total, records } = data;
  return Promise.resolve({
    total: total,
    list: records,
  });
};

const Prompt: React.FC<Props> = props => {
  const { tableProps, refresh } = useAntdTable(getTableData);
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();

  const [current, setCurrent] = React.useState<any>({});
  const [type, setType] = React.useState<'add' | 'edit'>('add');

  const columns = [
    {
      title: '标题',
      dataIndex: 'prometTitle',
      key: 'prometTitle',
    },

    {
      title: '内容',
      dataIndex: 'contents',
      key: 'contents',
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
  const handleEdit = record => {
    setCurrent(record);
    setType('edit');
    setVisible(true);
    form.setFieldsValue(record);
  };

  const handleOk = () => {
    form.validateFields().then(async values => {
      if (type === 'add') {
        await createPrompt({
          ...values,
        });
        message.success('提交成功');
        refresh();
      } else {
        // await editToken({
        await updatePrompt({
          ...values,
          id: current.id,
        });
        message.success('提交成功');
      }
      setVisible(false);
      refresh();
    });
  };

  const renderExtra = () => {
    return (
      <>
        {visible && (
          <Modal title="新增token" onOk={handleOk} open={visible} onCancel={() => setVisible(false)}>
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              <Form.Item rules={[{ required: true }]} label="promet名称" name="prometTitle">
                <Input placeholder="请输入promet名称" />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} label="prompt内容" name="contents">
                <Input.TextArea rows={4} placeholder="请输入内容" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </>
    );
  };

  return (
    <div className={styles['prompt-wrapper']}>
      <div className={styles['prompt-header']}>
        <div className={styles['prompt-filter']}>个性化模型</div>
        <div className="prompt-button">
          <Button
            type="primary"
            onClick={() => {
              setType('add');
              setVisible(true);
            }}
          >
            新增
          </Button>
        </div>
      </div>
      <div className={styles['prompt-table']}>
        <Table columns={columns} rowKey="id" style={{ overflow: 'auto' }} {...tableProps} />
      </div>
      {renderExtra()}
    </div>
  );
};

export default Prompt;
