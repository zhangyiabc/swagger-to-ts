// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 获取角色 GET /admin/system/sysRole/toAssign/${param0} */
export async function getToAssignSysRoleSystem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getToAssignSysRoleSystemParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/admin/system/sysRole/toAssign/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
