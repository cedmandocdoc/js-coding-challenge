import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";
import CountrySelect from "../country/CountrySelect";
import LanguageSelect from "../language/LanguageSelect";
import CurrencySelect from "../currency/CurrencySelect";
import useSettingsReducer, { ActionTypes } from "./useSettingsReducer";
import { Country, Settings } from "../../models";
import Flag from "../flag/Flag";
import SettingsButtonLabel from "./SettingsButtonLabel";

/* --- [TASK] ---
Changes on modal are only applied on SAVE

CURRENT SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- Changes to any of the select inputs are immediately effective.
- The modal is dismissed using the **[Close]** button

DESIRED SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- There is a **[Save]** and a **[Cancel]** button, both serving to dismiss the modal.
- Changes are taking effect only on **[Save]**

FURTHER DETAILS
- Positioning of the buttons within the modal is not in the scope of this task
--- [TASK] --- */

/* --- [TASK] ---
Reduced number of unnecessary re-renders

CURRENT SCENARIO
- The `SettingsSelector`-Button re-renders too often
- It re-renders every time the modal is opened, closed, or on changing the select inputs

DESIRED SCENARIO
- The `SettingsSelector`-Button only re-renders when relevant data changes (Country, Language, Currency)

FURTHER DETAILS
- The `SettingsSelector`-Button has a render counter that will log to the console (do not remove)
- Be aware that #1 changes some relevant behaviour for this task
--- [TASK] --- */

/* --- [TASK] ---
Improved layout and styling of modal dialog (CSS)

CURRENT SCENARIO
- The modal dialog lacks intentional layout (spacings, dimensions).
- On smaller devices, the available space is not utilized effectively.

DESIRED SCENARIO
- Ensure consistent spacing, padding, and dimensions.
- Implement responsive or adaptive behavior for the modal, especially on smaller devices.

FURTHER DETAILS
- Focus on injecting and structuring CSS, using selectors and properties effectively.
- Feel free to apply your preferred spacing and dimensions; the provided designs mereley serve as examples. Just make sure it is consistent.
- Bonus points awarded for aesthetically appealing re-design of elements.
--- [TASK] --- */

/* --- [TASK] ---
Improved use of TypeScript

CURRENT SCENARIO
- In `SettingsSelector`, there are individual `useState()` calls for `Country`, `Language`, and `Currency`.
- Throughout the entire project, there are several instances of type `any`.
    Example: 
    ```typescript
    ... = React.useState<any>(DEFAULT_COUNTRY);
    ```
- Default values are constants that are exported by each component. 
    Example:
    ```typescript
    .... { DEFAULT_COUNTRY } from "../country/CountrySelect";
    ```

DESIRED SCENARIO
- Consolidate `Country`, `Language`, and `Currency` into a single "state".
- Extract default values from the components and make them configurable from a central point.
- Eliminate any remaining instances of type `any`.

OPTIONAL BONUS
- Replace `any` in the `*.stories.tsx`  files with appropriate types.
--- [TASK] --- */

/* --- [TASK] ---
 ReactDOM.render is no longer supported

CURRENT SCENARIO
- There is an error logging in the console
    `Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot`

DESIRED SCENARIO
- The error log does not appear
- The cause of the the warning is fixed

FURTHER DETAILS
- Downgrading to React 17 is not an option 😉
--- [TASK] --- */

type SettingsButtonProps = {
  data: Settings;
  onClick: () => void;
};

const SettingsButton: FC<SettingsButtonProps> = memo(({ data, onClick }) => {
  // Render Counter
  const counter = useRef(0);

  // Increase render count.
  counter.current++;

  // Log current render count.
  console.log("Render count of button is: " + counter.current);

  /* Button */
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center shadow-md py-3 px-4 bg-white rounded-lg text-gray-800 hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg transition outline-none "
    >
      <Flag country={data.country} />
      <SettingsButtonLabel {...data} />
    </button>
  );
});

// Component
const SettingsSelector: FC = () => {
  // States
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [state, dispatch] = useSettingsReducer();
  const { data, sandbox } = state;

  // Actions
  const handleOpen = useCallback(() => {
    setModalIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const onCountryChange = useCallback(
    (country: Country) =>
      dispatch({ type: ActionTypes.CHANGE_COUNTRY, payload: country }),
    [dispatch]
  );

  const onCurrencyChange = useCallback(
    (currency: string) =>
      dispatch({ type: ActionTypes.CHANGE_CURRENCY, payload: currency }),
    [dispatch]
  );

  const onLanguageChange = useCallback(
    (language: string) =>
      dispatch({ type: ActionTypes.CHANGE_LANGUAGE, payload: language }),
    [dispatch]
  );

  const onClickSave = () => {
    dispatch({ type: ActionTypes.SAVE });
    setModalIsOpen(false);
  };

  // Render
  return (
    <div className="w-dvh h-dvh bg-slate-50 flex items-center justify-center">
      <SettingsButton data={data} onClick={handleOpen} />

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        className="bg-white w-[calc(100%-2rem)] md:w-[600px] flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg p-4 md:p-6 rounded-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-slate-50"
      >
        {/* Header */}
        <h2>Select your region, currency and language.</h2>

        {/* Country */}
        <CountrySelect value={sandbox.country} onChange={onCountryChange} />

        {/* Currency */}
        <CurrencySelect value={sandbox.currency} onChange={onCurrencyChange} />

        {/* Language */}
        <LanguageSelect
          language={sandbox.language}
          onChange={onLanguageChange}
        />

        {/* Action buttons */}
        <div className="flex gap-2 mt-4 justify-end">
          <button onClick={handleClose} className="px-3 h-8 rounded hover:bg-gray-100">Cancel</button>
          <button onClick={onClickSave} className="px-3 h-8 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsSelector;
