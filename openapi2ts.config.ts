import { APIDataType } from '@umijs/openapi/dist/serviceGenerator';

function toCamelCase(str) {
  return str
    .split(/[-_]/)
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

function compact(arr) {
  return arr.filter(item => item);
}

export default {
  schemaPath: 'http://localhost:8080/v2/api-docs?group=adminApi',
  apiPrefix: 'API_PREFIX', // 请求前缀 此处仅作为代理使用
  serversPath: './src/swagger',
  requestImportStatement: `import request from "src/utils/request"
import { API_PREFIX } from "src/utils/constant"`,
  hook: {
    customFileNames: (operationObject: any, apiPath: string) => {
      const { operationId } = operationObject;
      // 使用Using区分，使用Using前面的字符, swagger为避免重名，_后面会标注数字
      // TODO:由于接口名太过于草率，也可以使用下方函数名来生成文件名
      const repeatCount = operationId.split('_')?.[1] || '';
      const fileName = operationId.split('Using')[0] + repeatCount;

      const method = ['get', 'post', 'put', 'delete'];
      const methodMap = {
        get: 'getInfo',
        post: 'create',
        put: 'update',
        delete: 'remove',
      };
      if (method.includes(fileName)) {
        const bizName = apiPath.split('/')[0];
        return [`${methodMap[fileName]}${bizName}`];
      }
      return [fileName];
    },
    customFunctionName: (data: APIDataType) => {
      const newPath = data.path.replaceAll(/\{[a-zA-Z]*\}/g, '').replaceAll(/\/$/g, '');
      const pathArr: string[] = compact(newPath.split('/')).slice(1);
      if (data.method.toLowerCase() === 'get') {
        pathArr.push('get');
      }
      const fileName = pathArr.reverse().map(toCamelCase).join('-');
      return toCamelCase(fileName);
    },
  },
};
