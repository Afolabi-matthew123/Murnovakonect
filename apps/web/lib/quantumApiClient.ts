export async function quantumApiFetch(url: string, options: any = {}) {
  const token = localStorage.getItem('auth_token');

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? Bearer \ : '',
    },
  });
}
