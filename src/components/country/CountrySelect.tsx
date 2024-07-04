import { FC } from "react";
import countries from "i18n-iso-countries";
import Select from "react-select";
import CountrySelectOption from "./CountrySelectOption";
import CountrySelectInput from "./CountrySelectInput";
import { DEFAULT_COUNTRY } from "../../constants";
import { Country } from "../../models";

// Register countries
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// --- TASK G ---
// Please replace "any" with a proper type in this file (and where it is needed).

// Props
type Props = {
  value?: Country;
  onChange?: (value: Country) => void;
}

// Component
const CountrySelect: FC<Props> = ({
  value = DEFAULT_COUNTRY,
  onChange,
}) => {
  // Prepare Data
  const data = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => {
    return {
      value: { code, name },
      label: name,
    };
  });
  const defaultValue = { value: value, label: value.name };

  // Render
  return (
    <div>
      <label className="text-sm text-gray-800">
        Country
        <Select
          options={data}
          components={{ Option: CountrySelectOption, Control: CountrySelectInput,  }}
          value={defaultValue}
          onChange={(newValue) => {
            newValue && onChange?.(newValue.value);
          }}
        />
      </label>
    </div>
  );
};

export default CountrySelect;
