import { FC, useEffect, useState } from "react"
import ISO_6391_Languages from "iso-639-1";
import { Country } from "../../models"

type Props = {
  country: Country
  currency: string
  language: string
}

const SettingsButtonLabel: FC<Props> = ({ country, currency, language }) => {
  const short = `${country.code} - (${currency.split(' - ')[0]} - ${ISO_6391_Languages.getCode(language.split(' - ')[0])})`
  const long = `${country.name} - (${currency} - ${language})`

  const [label, setLabel] = useState(short)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')

    const changeLabel = (isShort: boolean) => setLabel(isShort ? short : long)

    const listener = (e: MediaQueryListEvent) => changeLabel(e.matches)
    
    changeLabel(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [setLabel, short, long])

  return <span>{label}</span>
}
export default SettingsButtonLabel