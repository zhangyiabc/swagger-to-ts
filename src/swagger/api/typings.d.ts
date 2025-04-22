declare namespace API {
  type AssginMenuVo = {
    /** 菜单id列表 */
    menuIdList?: number[];
    /** 角色id */
    roleId?: number;
  };

  type AssginRoleVo = {
    /** 角色id列表 */
    roleIdList?: number[];
    /** 用户id */
    userId?: number;
  };

  type Comments = {
    content?: string;
    discussionPostId?: number;
    id?: number;
    likes?: number;
    postedAt?: string;
    updatedAt?: string;
    userId?: number;
  };

  type DiscussionPosts = {
    content?: string;
    id?: number;
    likes?: number;
    postedAt?: string;
    title?: string;
    updatedAt?: string;
    userId?: number;
  };

  type getCommentsParams = {
    /** limit */
    limit: number;
    /** page */
    page: number;
  };

  type getDiscussionPostsParams = {
    content?: string;
    id?: number;
    likes?: number;
    /** limit */
    limit: number;
    /** page */
    page: number;
    postedAt?: string;
    title?: string;
    updatedAt?: string;
    userId?: number;
  };

  type getGetCommentsParams = {
    /** id */
    id: number;
  };

  type getGetDiscussionPostsParams = {
    /** id */
    id: number;
  };

  type getGetPrometParams = {
    /** id */
    id: number;
  };

  type getGetSysRoleSystemParams = {
    /** id */
    id: number;
  };

  type getGetSysUserSystemParams = {
    /** id */
    id: number;
  };

  type getGetTokenParams = {
    /** id */
    id: number;
  };

  type getPrometParams = {
    /** limit */
    limit: number;
    /** page */
    page: number;
  };

  type getSysRoleSystemParams = {
    /** limit */
    limit: number;
    /** page */
    page: number;
    roleName?: string;
  };

  type getSysUserSystemParams = {
    createTimeBegin?: string;
    createTimeEnd?: string;
    deptId?: number;
    keyword?: string;
    /** limit */
    limit: number;
    /** page */
    page: number;
    postId?: number;
    roleId?: number;
  };

  type getToAssignSysMenuSystemParams = {
    /** roleId */
    roleId: number;
  };

  type getToAssignSysRoleSystemParams = {
    /** userId */
    userId: number;
  };

  type getTokenParams = {
    createdAt?: string;
    expiresAt?: string;
    id?: number;
    /** limit */
    limit: number;
    /** page */
    page: number;
    token?: string;
    tokenName?: string;
  };

  type getUpdateStatusSysUserSystemParams = {
    /** id */
    id: number;
    /** status */
    status: number;
  };

  type LoginVo = {
    password?: string;
    username?: string;
  };

  type Promet = {
    contents?: string;
    createdAt?: string;
    id?: number;
    prometTitle?: string;
    updatedAt?: string;
  };

  type removeCommentsParams = {
    /** id */
    id: number;
  };

  type removeDiscussionPostsParams = {
    /** id */
    id: number;
  };

  type removePrometParams = {
    /** id */
    id: number;
  };

  type removeSysMenuSystemParams = {
    /** id */
    id: number;
  };

  type removeSysRoleSystemParams = {
    /** id */
    id: number;
  };

  type removeSysUserSystemParams = {
    /** id */
    id: number;
  };

  type removeTokenParams = {
    /** id */
    id: number;
  };

  type Result = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type SysMenu = {
    children?: SysMenu[];
    /** 组件路径 */
    component?: string;
    createTime?: string;
    /** 图标 */
    icon?: string;
    id?: number;
    isDeleted?: number;
    /** 名称 */
    name?: string;
    param?: Record<string, any>;
    /** 所属上级 */
    parentId?: number;
    /** 路由地址 */
    path?: string;
    /** 权限标识 */
    perms?: string;
    select?: boolean;
    /** 排序 */
    sortValue?: number;
    /** 状态(0:禁止,1:正常) */
    status?: number;
    /** 类型(1:菜单,2:按钮) */
    type?: number;
    updateTime?: string;
  };

  type SysRole = {
    createTime?: string;
    description?: string;
    id?: number;
    isDeleted?: number;
    param?: Record<string, any>;
    roleCode?: string;
    roleName?: string;
    updateTime?: string;
  };

  type SysUser = {
    createTime?: string;
    /** 部门id */
    deptId?: number;
    deptName?: string;
    /** 描述 */
    description?: string;
    /** 头像地址 */
    headUrl?: string;
    id?: number;
    isDeleted?: number;
    /** 姓名 */
    name?: string;
    /** openId */
    openId?: string;
    param?: Record<string, any>;
    /** 密码 */
    password?: string;
    /** 手机 */
    phone?: string;
    /** 岗位id */
    postId?: number;
    postName?: string;
    roleList?: SysRole[];
    /** 状态（1：正常 0：停用） */
    status?: number;
    updateTime?: string;
    /** 用户名 */
    username?: string;
  };

  type Token = {
    createdAt?: string;
    expiresAt?: string;
    id?: number;
    token?: string;
    tokenName?: string;
  };
}
