import type { Currency } from "../../types/Currency";

export const getCurrencies = async () => {
    const res = await fetch('/api/currencies');
    return res.json().then(data => data.body);
  };
  
  export const createCurrency = async (currency: Currency) => {
    const res = await fetch('/api/currencies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currency),
    });
    return res.json().then(data => data.body);
  };
  
  export const updateCurrency = async (id: string, currency: Currency) => {
    await fetch(`/api/currencies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currency),
    });
  };
  
  export const deleteCurrency = async (id: string) => {
    await fetch(`/api/currencies/${id}`, {
      method: 'DELETE',
    });
  };
  