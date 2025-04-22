import request from 'src/utils/request';

export function getTokenList(params: { page: number; limit: number }) {
  return request(`/api/auth/token/${params.page}/${params.limit}`);
}

interface AddToken {
  token: string;
  tokenName: string;
}

export function createToken(body: AddToken) {
  return request(`/api/auth/token/save`, {
    method: 'POST',
    data: JSON.stringify(body),
  });
}

export function deleteToken(id: number) {}

export function updateToken(body: { id: number } & Partial<AddToken>) {
  return request(`/api/auth/token/update`, {
    method: 'PUT',
    data: JSON.stringify(body),
  });
}
