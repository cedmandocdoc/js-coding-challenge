import { FC } from "react";
import { Country } from "../../models";

type Props = {
  country: Country;
};

const Flag: FC<Props> = ({ country }) => (
  <img
    className="w-5 object-cover"
    src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${country.code}.svg`}
    alt={country.name}
  />
);

export default Flag;
