
import type { Currency } from "../types/Currency";


export default function CurrencyList({ currencies, onEdit, onDelete }:{currencies:Currency[],onEdit:(currency:Currency)=>void,onDelete:(id:string)=>void}) {
    return (
      <table className="min-w-full border mt-4 bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">Active</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency: Currency) => (
            <tr key={currency.id} className="text-center">
              <td className="border px-4 py-2">{currency.code}</td>
              <td className="border px-4 py-2">{currency.name}</td>
              <td className="border px-4 py-2">{currency.symbol}</td>
              <td className="border px-4 py-2">{currency.active ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => onEdit(currency)} className="text-blue-600">Edit</button>
                <button onClick={() => onDelete(currency.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  