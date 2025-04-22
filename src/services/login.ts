import request from 'src/utils/request';

export const login = (username: string, password: string) => {
  return request('/api/admin/system/index/login', {
    method: 'POST',
    data: JSON.stringify({
      password: password,
      username: username,
    }),
  });
};

// /admin/system/index/info
export const getUserInfo = () => {
  return request('/api/admin/system/index/info');
};

export const sign = (body: any) => {
  return request('/api/admin/system/sysUser/save', {
    method: 'POST',
    data: JSON.stringify(body),
  });
};

export const updateUserInfo = (body: any) => {
  return request('/api/admin/system/sysUser/update', {
    method: 'PUT',
    data: JSON.stringify(body),
  });
};

export const getUserDetail = (id: number) => {
  return request(`/api/admin/system/sysUser/get/${id}`);
};
