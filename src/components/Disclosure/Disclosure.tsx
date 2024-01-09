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

const DEFAULT_OPENED = true as const;

export interface DisclosureValue {
  id: string;
  opened: boolean;
}

const DisclosureValueContext = createContext<DisclosureValue | undefined>(
  undefined,
);

export const useDisclosureValue = () => {
  const value = useContext(DisclosureValueContext);
  if (value === undefined) {
    throw new Error("useDisclosureValue should be used within Disclosure");
  }
  return value;
};

export interface DisclosureAction {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const DisclosureActionContext = createContext<DisclosureAction | undefined>(
  undefined,
);

export const useDisclosureAction = () => {
  const action = useContext(DisclosureActionContext);
  if (action === undefined) {
    throw new Error("useDisclosureAction should be used within Disclosure");
  }
  return action;
};

export type DisclosureRef = DisclosureAction | undefined;

export interface DisclosureProps {
  children?: React.ReactNode | ((value: DisclosureValue) => React.ReactNode);
  defaultOpened?: boolean;
}

export const Disclosure = forwardRef<DisclosureRef, DisclosureProps>(
  ({ children, defaultOpened = DEFAULT_OPENED }, ref) => {
    const id = useId();
    const [opened, setOpened] = useState(defaultOpened);

    const value = useMemo(() => ({ id, opened }), [opened]);
    const action = useMemo(
      () => ({
        open: () => setOpened(true),
        close: () => setOpened(false),
        toggle: () => setOpened((s) => !s),
      }),
      [],
    );

    useImperativeHandle(ref, () => action, []);

    return (
      <DisclosureValueContext.Provider value={value}>
        <DisclosureActionContext.Provider value={action}>
          {typeof children === "function" ? children(value) : children}
        </DisclosureActionContext.Provider>
      </DisclosureValueContext.Provider>
    );
  },
);

export const useDisclosureRef = () =>
  useRef<DisclosureAction | undefined>(undefined);
