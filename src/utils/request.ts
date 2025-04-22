import { isPlainObject } from 'lodash';
import { message } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const login = () => {
  const { origin } = window;
  window.location.href = `${origin}/login`;
};

// 定义一个函数，用于通知用户
function notify(notice: string) {
  // 使用message.error方法，将notice参数作为错误信息进行通知
  message.error(notice);
}

export interface RequestParams {
  codeField?: string;
  msgField?: string;
  isSuccess?: (body: any) => boolean;
  shouldLogin?: (body: any) => boolean;
  hideNotify?: boolean;
  isBinary?: boolean;
}

export default async function request<T = any>(
  url: string,
  options: AxiosRequestConfig = {},
  params: RequestParams & { messageField?: string } = {},
): Promise<T> {
  const {
    codeField = 'code',
    msgField = 'msg',
    messageField = 'message',
    isSuccess,
    shouldLogin,
    hideNotify = false,
    isBinary = false,
  } = params;
  const defaultOptions = { credentials: 'include' };
  options = {
    headers: {
      token: localStorage.getItem('token') || '',
    },
    ...defaultOptions,
    ...options,
  };

  if ((['POST', 'PUT', 'DELETE'] as any[]).includes((options.method || '').toUpperCase())) {
    const defaultContentType = !isBinary
      ? {
          'Content-Type': 'application/json;charset=utf-8',
        }
      : undefined;

    options.headers = {
      Accept: 'application/json',
      ...defaultContentType,
      ...options.headers,
    };
    if (typeof options.data === 'object' && !isBinary) {
      options.data = JSON.stringify(options.data);
    }
  }

  try {
    const response: AxiosResponse = await axios(url, options);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`网络异常, statusCode(${response.status})`);
    }
    const json = response.data;
    if (!isPlainObject(json)) {
      throw '返回数据格式错误';
    }
    if (
      typeof shouldLogin === 'function'
        ? shouldLogin(json)
        : [1024, 208, 1102, 1005, 1101, 1009].includes(+json[codeField])
    ) {
      login();
      return;
    } else if (typeof isSuccess === 'function' ? isSuccess(json) : +json[codeField] === 0 || +json[codeField] === 200) {
      return json;
    } else {
      throw json;
    }
  } catch (e: any) {
    if (e === 'login') {
    }

    if (!(e instanceof Error) && (e[msgField] || e[messageField])) {
      if (hideNotify !== true) {
        notify(e[msgField] || e[messageField]);
      }
    } else if (hideNotify !== true) {
      notify('网络错误');
    }

    // throw e;
  }
}
