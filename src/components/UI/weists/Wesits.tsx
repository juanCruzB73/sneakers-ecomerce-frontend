import style from './weist.module.css';

interface WesitsProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
  priceRange: number;
  onPriceChange: (price: number) => void;
}

export const Wesits = ({
  selectedSize,
  onSizeChange,
  priceRange,
  onPriceChange,
}: WesitsProps) => {
  return (
    <div className={style.catalogProductFilterContainer}>
      <h3>Talles</h3>
      <select
        value={selectedSize}
        onChange={(e) => onSizeChange(e.target.value)}
      >
        <option value="">Select size</option>
        <option value="XL">XL</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="S">S</option>
      </select>

      <h3>Price: ${priceRange}</h3>
      <input
        type="range"
        min="0"
        max="10000"
        step="10"
        value={priceRange}
        onChange={(e) => onPriceChange(Number(e.target.value))}
      />
    </div>
  );
};