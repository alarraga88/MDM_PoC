
import type { MockMethod } from 'vite-plugin-mock';
import type { Currency } from '../types/Currency';

let currencies:Currency[] = [
  {
    id: '1',
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default [
  {
    url: '/api/currencies',
    method: 'get',
    response: () => {
      return {
        status: 200,
        body: currencies,
      };
    },
  },
  {
    url: '/api/currencies',
    method: 'post',
    response: ({ body }:{body:Currency}) => {
      const newCurrency = {
        ...body,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      currencies.push(newCurrency);
      return {
        status: 201,
        body: newCurrency,
      };
    },
  },
  {
    url: '/api/currencies/:id',
    method: 'put',
    response: ({ body, query }:{body:Currency,query:any}) => {
      const { id } = query;
      currencies = currencies.map(c =>
        c.id === id ? { ...c, ...body, updatedAt: new Date().toISOString() } : c
      );
      return {
        status: 200,
        body: { message: 'Updated' },
      };
    },
  },
  {
    url: '/api/currencies/:id',
    method: 'delete',
    response: ({ query }:{query:any}) => {
      const { id } = query;
      currencies = currencies.filter(c => c.id !== id);
      return {
        status: 200,
        body: { message: 'Deleted' },
      };
    },
  },
] as MockMethod[];

