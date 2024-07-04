import { ControlProps, components } from "react-select";
import { Country } from "../../models";
import Flag from "../flag/Flag";
import styles from './CountrySelect.module.css'

// Component
export const CountrySelectInput = (
  props: ControlProps<{ value: Country; label: string }, false>
) => {
  const value = props.getValue()[0]
  return (
    <components.Control {...props}>
      <Flag country={value.value} className={styles.countrySelectInput__flag} />
      {props.children}
    </components.Control>
  );
};

export default CountrySelectInput