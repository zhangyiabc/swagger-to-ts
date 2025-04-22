// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 获取用户 GET /admin/system/sysUser/get/${param0} */
export async function getGetSysUserSystem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGetSysUserSystemParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/admin/system/sysUser/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
