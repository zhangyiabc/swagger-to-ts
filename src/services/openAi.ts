import OpenAI from 'openai';

interface IGetOpenAiAnswerParams {
  modelName: string;
  messages: any[];
  token: string;
}

const endpoint = 'https://models.inference.ai.azure.com';

export const getOpenAiAnswer = async (params: IGetOpenAiAnswerParams) => {
  const { modelName, messages, token } = params;
  const client = new OpenAI({ baseURL: endpoint, apiKey: token, dangerouslyAllowBrowser: true });
  const response = await client.chat.completions.create({
    messages: messages,
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });
  return {
    code: '200',
    data: response,
    msg: 'success',
  };
};
