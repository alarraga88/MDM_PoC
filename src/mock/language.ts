import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/languages',
    method: 'get',
    response: () => [
      { id: '1', code: 'en', name: 'English' },
    ],
  },
] as MockMethod[];
