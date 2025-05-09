
  import { useState, useEffect } from 'react';
import CurrencyForm from '../components/CurrencyForm';
import CurrencyList from '../components/CurrencyList';
import { getCurrencies, createCurrency, updateCurrency, deleteCurrency } from '../mock/API/currencyApi';
import type { Currency } from '../types/Currency';

export default function CurrencyPage() {
  const [currencies, setCurrencies] = useState([]);
  const [editing, setEditing] = useState<Currency|null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCurrencies().then(setCurrencies);
  }, []);

  const handleSave = async (data: Currency) => {
    if (editing) {
      await updateCurrency(editing?.id, data);
    } else {
      await createCurrency(data);
    }
    setCurrencies(await getCurrencies());
    setEditing(null);
    setOpen(false)
  };

  const handleEdit = (currency:Currency) => {
    setEditing(currency);
    setOpen(true)
  };

  const handleDelete = async (id:string) => {
    setOpen(false)
    await deleteCurrency(id);
    setCurrencies(await getCurrencies());
  };

  return (
    <div className="p-6 flex flex-col gap-3">
            <div className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span className="text-2xl font-bold ">Currencies</span>
        <button type="button" onClick={()=>{setEditing(null); setOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded mr-3">
        Create Currency
      </button>
        </div>
      <CurrencyList currencies={currencies} onEdit={handleEdit} onDelete={handleDelete} />
      {open &&
        <>
      <h1 className="text-xl font-bold ">Currency Management</h1>
      <CurrencyForm onSave={handleSave} initialData={editing!} />
      </>
}
    </div>
  );
}