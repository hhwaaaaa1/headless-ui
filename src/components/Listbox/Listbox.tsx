import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

export interface ListboxValue {
  id: string;
  optionValues: Array<string | number>;
  optionSize: number;
  opened: boolean;
  focusedIndex: number;
  selectedValue: string | number | undefined;
}

const ListboxValueContext = createContext<ListboxValue | undefined>(undefined);

export const useListboxValue = () => {
  const value = useContext(ListboxValueContext);
  if (value === undefined) {
    throw new Error("useListboxValue should be used within Listbox");
  }
  return value;
};

interface ListboxAction {
  setOptionValues: (values: Array<string | number>) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  focus: (index: number) => void;
  select: (value: string | number) => void;
}

export const ListboxActionContext = createContext<ListboxAction | undefined>(
  undefined,
);

export const useListboxAction = () => {
  const action = useContext(ListboxActionContext);
  if (action === undefined) {
    throw new Error("useListboxAction should be used within Listbox");
  }
  return action;
};

export type ListboxRef = Omit<ListboxAction, "setOptionValues" | "focus">;

export interface ListboxProps {
  children?: React.ReactNode | ((value: ListboxValue) => React.ReactNode);
  defaultSelectedValue?: string | number;
  onToggle?: (opened: boolean) => void;
  onSelect?: (value: string | number) => void;
}

export const Listbox = forwardRef<ListboxRef, ListboxProps>(
  ({ children, defaultSelectedValue, onToggle, onSelect }, ref) => {
    const id = useId();
    const optionValues = useRef<Array<string | number>>([]);
    const [opened, setOpened] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0);

    const [selectedValue, setSelectedValue] = useState<
      string | number | undefined
    >(defaultSelectedValue);

    const value = useMemo(
      () => ({
        id,
        optionValues: optionValues.current,
        optionSize: optionValues.current.length,
        opened,
        focusedIndex,
        selectedValue,
      }),
      [id, opened, focusedIndex, selectedValue],
    );

    const action = useMemo(
      () => ({
        setOptionValues: (_values: Array<string | number>) => {
          optionValues.current = _values;
        },
        open: () => {
          setOpened(true);
          onToggle?.(true);
        },
        close: () => {
          setOpened(false);
          onToggle?.(false);
        },
        toggle: () => {
          let opened: boolean;
          flushSync(() => setOpened((s) => (opened = !s)));
          onToggle?.(opened!);
        },
        focus: setFocusedIndex,
        select: (value: string | number) => {
          setSelectedValue(value);
          onSelect?.(value);
        },
      }),
      [onToggle, onSelect],
    );

    useImperativeHandle(
      ref,
      () => ({
        open: action.open,
        close: action.close,
        toggle: action.toggle,
        select: action.select,
      }),
      [action],
    );

    return (
      <ListboxValueContext.Provider value={value}>
        <ListboxActionContext.Provider value={action}>
          {typeof children === "function" ? children(value) : children}
        </ListboxActionContext.Provider>
      </ListboxValueContext.Provider>
    );
  },
);
