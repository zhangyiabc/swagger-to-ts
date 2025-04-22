import request from 'src/utils/request';

export async function getPromptList(params: { page: number; limit: number }) {
  const { page, limit } = params;
  return request(`/api/auth/promet/${page}/${limit}`);
}

interface AddPrompt {
  token: string;
  tokenName: string;
}

export function createPrompt(body: AddPrompt) {
  return request(`/api/auth/promet/save`, {
    method: 'POST',
    data: JSON.stringify(body),
  });
}

export function deletePrompt(id: number) {}

export function updatePrompt(body: { id: number } & Partial<AddPrompt>) {
  return request(`/api/auth/promet/update`, {
    method: 'PUT',
    data: JSON.stringify(body),
  });
}
