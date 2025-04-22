// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** info GET /admin/system/index/info */
export async function getInfoIndexSystem(options?: { [key: string]: any }) {
  return request<API.Result>(`${API_PREFIX}/admin/system/index/info`, {
    method: 'GET',
    ...(options || {}),
  });
}
