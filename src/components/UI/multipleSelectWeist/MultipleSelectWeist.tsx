import React from 'react';
import { useForm } from '../../../hooks/useForm';
import style from './multipleSelectWeist.module.css';

interface WeistMultiSelectProps {
  initialWeist?: string[];
  onChange: (newWeist: string[]) => void;
}

export const WeistMultiSelect: React.FC<WeistMultiSelectProps> = ({ initialWeist = [],onChange }) => {
    
  const { formValues, setFormValue } = useForm<{ weist: string[] }>({
    weist: initialWeist,
  });

  const weistOptions = ['XS', 'S', 'M', 'L', 'XL'];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const updatedWeist = checked
      ? [...formValues.weist, value]
      : formValues.weist.filter((item) => item !== value);

    setFormValue({
      ...formValues,
      weist: updatedWeist,
    });
    onChange(updatedWeist);
  };

  return (
    <div className={style.customSelectContainer}>
      <label>Weist</label>
      <div className={style.dropdown}>
        {weistOptions.map((option) => (
          <label key={option} className={style.checkboxOption}>
            <input
              type="checkbox"
              name="weist"
              value={option}
              checked={formValues.weist.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            />
            {option}
          </label>
        ))}
      </div>
      <p>Selected: {formValues.weist.join(', ') || 'None'}</p>
    </div>
  );
};
