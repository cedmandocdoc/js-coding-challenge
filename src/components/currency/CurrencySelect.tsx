import { FC } from "react";
import { data as CurrencyData } from "currency-codes";
import Select from "react-select";
import { DEFAULT_CURRENCY } from "../../constants";

// Props
type Props =  {
  value?: string;
  onChange?: (currency: string) => void;
}

// Component
const CurrencySelect: FC<Props> = ({
  value = DEFAULT_CURRENCY,
  onChange,
}) => {
  // Prepare data
  const data = CurrencyData.map(({ code, currency }) => {
    return {
      value: code + " - " + currency,
      label: code + " - " + currency,
    };
  });
  const defaultValue = { value: value, label: value };

  // Render
  return (
    <div>
      <label className="text-sm text-gray-800">
        Currency
        <Select
          options={data}
          value={defaultValue}
          onChange={(newValue) => {
            newValue && onChange?.(newValue.value);
          }}
        />
      </label>
    </div>
  );
};

export default CurrencySelect;
