import { OptionProps, components } from "react-select";
import { Country } from "../../models";
import Flag from "../flag/Flag";

/* --- [TASK] ---
Country flags in select field

CURRENT SCENARIO
- The `CountrySelect` displays only the names of the countries.

DESIRED SCENARIO
- The `CountrySelect` displays the corresponding country flag next to the title.
- Flags are visible in both the options and the input field, drawing inspiration from this example:

FURTHER DETAILS
- No expectation to alter the dimensions of the select field, though it's optional.
- Implement a well-considered layout strategy.
- Retrieve flag icons from:
    `https://catamphetamine.gitlab.io/country-flag-icons/3x2/<ISO_CODE>.svg` (codes are in uppercase)
- Note that the `'i18n-iso-countries'` package in use already  contains the compatible codes.
- Flags appearing on the `SettingsSelector`-Button is optional
--- [TASK] --- */

// Component
const CountrySelectOption = (
  props: OptionProps<{ value: Country; label: string }, false>
) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="flex gap-2 items-center">
          <Flag country={props.data.value} />
          <span>{props.data.label}</span>
        </div>
      </components.Option>
    </div>
  );
};

export default CountrySelectOption