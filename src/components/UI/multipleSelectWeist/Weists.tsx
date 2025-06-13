import React from 'react';
import style from './Weists.module.css';

interface Weist {
  id: number;
  value: string;
}

interface IWeistStock {
  stock: number;
  weist: Weist;
}

interface WeistsProps {
  weistStocks: IWeistStock[];
  setWeistStocks: React.Dispatch<React.SetStateAction<IWeistStock[]>>;
}

const weistOptions: Weist[] = [
  { id: 1, value: 'S' },
  { id: 2, value: 'M' },
  { id: 3, value: 'L' },
  { id: 4, value: 'XL' }
];

export const Weists: React.FC<WeistsProps> = ({ weistStocks, setWeistStocks }) => {
  const onStockChange = (weistValue: string, newStock: number) => {
    
    setWeistStocks(prev => {
      const index = prev.findIndex(ws => ws.weist.value === weistValue);
      if (index === -1) {
        const weistObj = weistOptions.find(w => w.value === weistValue);
        if (!weistObj) return prev;
        return [...prev, { stock: newStock, weist: weistObj }];
      } else {
        const updated = [...prev];
        updated[index] = { ...updated[index], stock: newStock };
        return updated;
      }
    });
  };

  const getStockValue = (weistValue: string) => {
    const ws = weistStocks.find(ws => ws.weist.value === weistValue);
    return ws ? ws.stock : 0;
  };

  return (
    <div className={style.customSelectContainer}>
      <label>Weist Stocks</label>
      <div className={style.dropdown}>
        {weistOptions.map(option => (
          <label key={option.value} className={style.checkboxOption}>
            {option.value}
            <input
              type="number"
              min={0}
              value={getStockValue(option.value)}
              onChange={(e) => onStockChange(option.value, Number(e.target.value))}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
