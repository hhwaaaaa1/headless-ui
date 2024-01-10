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

export interface ListboxValue {
  id: string;
  values: Array<string | number>;
  size: number;
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
  setValues: (values: Array<string | number>) => void;
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

export type ListboxRef = Omit<ListboxAction, "setValues" | "focus">;

export interface ListboxProps {
  children?: React.ReactNode | ((value: ListboxValue) => React.ReactNode);
  defaultSelectedValue?: string | number;
}

export const Listbox = forwardRef<ListboxRef, ListboxProps>(
  ({ children, defaultSelectedValue }, ref) => {
    const id = useId();
    const values = useRef<Array<string | number>>([]);
    const [opened, setOpened] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0);

    const [selectedValue, setSelectedValue] = useState<
      string | number | undefined
    >(defaultSelectedValue);

    const value = useMemo(
      () => ({
        id,
        values: values.current,
        size: values.current.length,
        opened,
        focusedIndex,
        selectedValue,
      }),
      [id, opened, focusedIndex, selectedValue],
    );

    const action = useMemo(
      () => ({
        setValues: (_values: Array<string | number>) => {
          values.current = _values;
        },
        open: () => setOpened(true),
        close: () => setOpened(false),
        toggle: () => setOpened((s) => !s),
        focus: setFocusedIndex,
        select: setSelectedValue,
      }),
      [],
    );

    useImperativeHandle(
      ref,
      () => ({
        open: () => setOpened(true),
        close: () => setOpened(false),
        toggle: () => setOpened((s) => !s),
        select: setSelectedValue,
      }),
      [],
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
