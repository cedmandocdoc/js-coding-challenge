import { FC } from "react";
import { Country } from "../../models";
import styles from './Flag.module.css'

type Props = {
  country: Country;
  className?: string
};

const Flag: FC<Props> = ({ country, className = '' }) => (
  <img
    className={`${styles.flag} ${className}`}
    src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.code}.svg`}
    alt={country.name}
  />
);

export default Flag;
