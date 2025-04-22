// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 更新状态 GET /admin/system/sysUser/updateStatus/${param0}/${param1} */
export async function getUpdateStatusSysUserSystem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUpdateStatusSysUserSystemParams,
  options?: { [key: string]: any },
) {
  const { id: param0, status: param1, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/admin/system/sysUser/updateStatus/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
