// @ts-ignore
/* eslint-disable */
import request from 'src/utils/request';
import { API_PREFIX } from 'src/utils/constant';

/** 查询所有菜单和角色分配的菜单 GET /admin/system/sysMenu/toAssign/${param0} */
export async function getToAssignSysMenuSystem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getToAssignSysMenuSystemParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.Result>(`${API_PREFIX}/admin/system/sysMenu/toAssign/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
