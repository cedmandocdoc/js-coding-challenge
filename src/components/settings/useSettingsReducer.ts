import { useReducer } from "react";
import { Country } from "../../models";
import {
  DEFAULT_COUNTRY,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
} from "../../constants";

type Settings = {
  country: Country;
  currency: string;
  language: string;
};

type State = {
  data: Settings;
  sandbox: Settings;
};

export enum ActionTypes {
  CHANGE_COUNTRY = "CHANGE_COUNTRY",
  CHANGE_CURRENCY = "CHANGE_CURRENCY",
  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
  SAVE = "SAVE",
}

type Action =
  | { type: ActionTypes.CHANGE_COUNTRY; payload: Country }
  | {
      type: ActionTypes.CHANGE_CURRENCY | ActionTypes.CHANGE_LANGUAGE;
      payload: string;
    }
  | { type: ActionTypes.SAVE, payload?: null }

const initial: State = {
  data: {
    country: DEFAULT_COUNTRY,
    currency: DEFAULT_CURRENCY,
    language: DEFAULT_LANGUAGE,
  },
  sandbox: {
    country: DEFAULT_COUNTRY,
    currency: DEFAULT_CURRENCY,
    language: DEFAULT_LANGUAGE,
  }
};

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.CHANGE_COUNTRY:
      return { ...state, sandbox: { ...state.sandbox, country: payload } };
    case ActionTypes.CHANGE_CURRENCY:
      return { ...state, sandbox: { ...state.sandbox, currency: payload } };
    case ActionTypes.CHANGE_LANGUAGE:
      return { ...state, sandbox: { ...state.sandbox, language: payload } };
    case ActionTypes.SAVE:
      return { ...state, data: state.sandbox }
    default:
      return state;
  }
};

const useSettingsReducer = () => useReducer(reducer, initial);

export default useSettingsReducer;
