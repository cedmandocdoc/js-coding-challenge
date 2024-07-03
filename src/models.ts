export type Country = {
  code: string,
  name: string
}

export type Settings = {
  country: Country;
  currency: string;
  language: string;
};