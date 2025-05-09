import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Currency } from '../types/Currency';


export default function CurrencyForm({
  onSave,
  initialData,
}: {
  onSave: (val: Currency) => Promise<void>;
  initialData: Currency;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Currency>({
    defaultValues: {
      code:initialData?.code || '',
      name: initialData?.name||'',
      symbol: initialData?.symbol|| '',
      active: initialData?.active || true,
      id: initialData?.id||'',
      createdAt: initialData?.createdAt||'',
      updatedAt: initialData?.updatedAt||'',
    },
  });

  useEffect(() => {
    if (!initialData) {
        reset({
            code: '',
            name: '',
            symbol: '',
            active: true,
            id: '',
            createdAt: '',
            updatedAt: '',
          })
    }
    else{
        reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: Currency) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium">Code</label>
        <input
          {...register('code', {
            required: 'Code is required',
            pattern: {
              value: /^[A-Z]{3}$/,
              message: 'Code must be 3 uppercase letters',
            },
            minLength: { value: 3, message: 'Minimum 3 characters' },
            maxLength: { value: 3, message: 'Maximum 3 characters' },
          })}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 1, message: 'Name must not be empty' },
            maxLength: { value: 100, message: 'Max 100 characters' },
          })}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Symbol</label>
        <input
          {...register('symbol', {
            maxLength: { value: 5, message: 'Max 5 characters' },
          })}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol.message}</p>}
      </div>

      <div>
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" {...register('active')} />
          <span>Active</span>
        </label>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-3">
       Save
      </button>

      <button
        type="button"
        onClick={() =>
          reset({
            code: '',
            name: '',
            symbol: '',
            active: true,
            id: '',
            createdAt: '',
            updatedAt: '',
          })
        }
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </form>
  );
}
