// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 删除用户 DELETE /admin/system/sysUser/remove/${param0} */
export async function removeSysUserSystem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeSysUserSystemParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/admin/system/sysUser/remove/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
