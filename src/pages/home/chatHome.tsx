import {
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
  Suggestion,
  BubbleProps,
} from '@ant-design/x';
import _ from 'lodash';
import { createStyles } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import classname from 'classnames';
import { Avatar } from 'src/components';
import { getOpenAiAnswer } from 'src/services/openAi';
import { getTokenList } from 'src/services/token';
import { getPromptList } from 'src/services/prompt';
import 'src/services/login';
import { useNavigate } from 'react-router';
import markdownit from 'markdown-it';
import {
  CommentOutlined,
  FireOutlined,
  HeartOutlined,
  ReadOutlined,
  SmileOutlined,
  OpenAIOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { type GetProp, Space, Select, Popover, Typography } from 'antd';
import './chatHome.scss';
import { BubbleFooter } from './components';
import { useMount } from 'ahooks';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores';

// 定义一个renderTitle函数，用于渲染标题
const renderTitle = (icon: React.ReactElement, title: string) => (
  // 使用Space组件，将icon和title水平排列
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);

const md = markdownit({ html: true, breaks: true });

const renderMarkdown: BubbleProps['messageRender'] = content => (
  <Typography>
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
    <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
  </Typography>
);

const defaultConversationsItems = [
  {
    key: '0',
    label: '我的会话',
  },
];

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 1000px;
      height: 100%;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;

      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 18px 12px;
      box-sizing: border-box;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 32px ${token.paddingLG}px ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,

    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

const placeholderPromptsItems: GetProp<typeof Prompts, 'items'> = [
  {
    key: '1',
    label: renderTitle(<FireOutlined style={{ color: '#FF4D4F' }} />, '热词'),
    description: '你对什么感兴趣?',
    children: [
      {
        key: '1-1',
        description: `什么是大模型?`,
      },
      {
        key: '1-2',
        description: `什么是AGI?`,
      },
      {
        key: '1-3',
        description: `什么是agent?`,
      },
    ],
  },
  {
    key: '2',
    label: renderTitle(<ReadOutlined style={{ color: '#1890FF' }} />, 'Design Guide'),
    description: 'How to design a good product?',
    children: [
      {
        key: '2-1',
        icon: <HeartOutlined />,
        description: `Know the well`,
      },
      {
        key: '2-2',
        icon: <SmileOutlined />,
        description: `Set the AI role`,
      },
      {
        key: '2-3',
        icon: <CommentOutlined />,
        description: `Express the feeling`,
      },
    ],
  },
];

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    typing: { step: 5, interval: 20 },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
    messageRender: renderMarkdown,
    avatar: <Avatar name="ai" />,
    footer: <BubbleFooter />,
  },
  local: {
    placement: 'end',
    variant: 'shadow',
    avatar: <Avatar name="张益达" />,
  },
};

type SuggestionItems = Exclude<GetProp<typeof Suggestion, 'items'>, () => void>;

const Independent: React.FC = () => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const { name, phone } = userStore;
  // ==================== Style ====================
  const { styles } = useStyle();

  const [content, setContent] = React.useState('');

  const [conversationsItems, setConversationsItems] = React.useState(defaultConversationsItems);

  const [suggestions, setSuggestions] = useState<SuggestionItems>([]);
  const [promptList, setPromptList] = useState<any[]>([]);
  const [tokenList, setTokenList] = useState<any[]>([]);

  const [activeKey, setActiveKey] = React.useState(defaultConversationsItems[0].key);

  const [activeToken, setActiveToken] = useState<string>();
  const tokenRef = useRef<string>('');
  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async ({ message, messages }, { onSuccess }) => {
      const reqMsgs = messages.map((msg, index) => {
        return {
          role: index % 2 === 0 ? 'user' : 'system',
          content: msg,
        };
      });
      const { data } = await getOpenAiAnswer({
        messages: reqMsgs,
        token: activeToken || tokenRef.current,
        modelName: 'gpt-4o',
      });
      onSuccess(data.choices[0].message.content);
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });

  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = (nextContent: string) => {
    if (!nextContent) return;
    // 现在有一个字符串， [code]:xxxxx，其中code是变量，前面是[,后面是]:,xxxxx是无用的任意字符，请你把code获取出来
    // const code = nextContent.match(/\[(.*?)\]/)?.[1]; // 正则表达式匹配
    onRequest(nextContent);
    setContent('');
  };

  const onPromptsItemClick: GetProp<typeof Prompts, 'onItemClick'> = info => {
    onRequest(info.data.description as string);
  };

  const onConversationClick: GetProp<typeof Conversations, 'onActiveChange'> = key => {
    setActiveKey(key);
  };

  // ==================== Nodes ====================
  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="你好！我是你的贴心AI小助手"
        description="广泛的知识储备，为您提供清晰、易懂的回答和解释"
      />
      <Prompts
        title="您想要询问什么?"
        items={placeholderPromptsItems}
        styles={{
          list: {
            width: '100%',
          },
          item: {
            flex: 1,
          },
        }}
        onItemClick={onPromptsItemClick}
      />
    </Space>
  );

  const items: GetProp<typeof Bubble.List, 'items'> = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === 'loading',
    role: status === 'local' ? 'local' : 'ai',
    content: message,
  }));

  const renderPopoverContent = () => {
    return (
      <div className="popover-info-wrapper">
        <div
          className="popover-info-item"
          onClick={() => {
            navigate('/token');
          }}
        >
          <div className="item-icon">
            <OpenAIOutlined style={{ fontSize: '20px' }} />
          </div>
          <div className="item-test">我的token</div>
        </div>
        <div
          className="popover-info-item"
          onClick={() => {
            navigate('/user');
          }}
        >
          <div className="item-icon">
            <UserOutlined style={{ fontSize: '20px' }} />
          </div>
          <div className="item-test">我的信息</div>
        </div>
      </div>
    );
  };

  const init = async () => {
    const params = {
      page: 1,
      limit: 10,
    };
    const { data: tokenData } = await getTokenList(params);
    const tokenDataList = (tokenData?.records || []).map((item: any) => {
      return {
        label: item.tokenName,
        value: item.token,
      };
    });
    setTokenList(tokenDataList);
    setActiveToken(_.get(tokenDataList, '0.value'));
    tokenRef.current = _.get(tokenDataList, '0.value');
    const { data: promptData } = await getPromptList(params);

    const promptDataList = (promptData?.records || []).map((item: any) => {
      return {
        label: item.prometTitle,
        value: item.contents,
        content: item.contents,
      };
    });
    setPromptList(promptDataList);

    setSuggestions(promptDataList);
  };

  useMount(() => {
    init();
  });

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 添加会话 */}
        {/* <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
        >
          New Conversation
        </Button> */}
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          onActiveChange={onConversationClick}
        />
        <Popover placement="topRight" content={renderPopoverContent()}>
          <div className="my-info-wrapper">
            <span className="my-info-name">{name}</span>
            <Avatar name={phone} />
          </div>
        </Popover>
      </div>
      <div className={classname(styles.chat, 'chat-wrapper')}>
        <div className="select-modal">
          <Select
            className="select-input"
            value={activeToken}
            options={tokenList}
            onChange={(value, option) => {
              setActiveToken(value);
            }}
          />
        </div>
        {/* 🌟 消息列表 */}
        <Bubble.List
          items={items.length > 0 ? items : [{ content: placeholderNode, variant: 'borderless' }]}
          roles={roles}
          className={styles.messages}
        />
        {/* 🌟 提示词 */}
        {/* <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} /> */}
        {/* 🌟 输入框 */}
        <Suggestion
          items={suggestions}
          onSelect={itemVal => {
            setContent(`[${itemVal}]:`);
          }}
        >
          {({ onTrigger, onKeyDown }) => {
            return (
              <Sender
                submitType="shiftEnter"
                value={content}
                onSubmit={onSubmit}
                onChange={nextVal => {
                  if (nextVal === '/') {
                    onTrigger();
                  } else if (!nextVal) {
                    onTrigger(false);
                  }
                  setContent(nextVal);
                }}
                onKeyDown={onKeyDown}
                loading={agent.isRequesting()}
                className={styles.sender}
                placeholder="输入 / 获取建议"
              />
            );
          }}
        </Suggestion>
      </div>
    </div>
  );
};

export default observer(Independent);
