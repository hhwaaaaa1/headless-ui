import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TabButton } from "./Tab.Button";
import { TabPanel } from "./Tab.Panel";

const DEFAULT_SELECTED_INDEX = 0;

export interface TabValue {
  id: string;
  selectedIndex: number;
  index: number;
}

const TabValueContext = createContext<TabValue | undefined>(undefined);

export const useTabValue = () => {
  const value = useContext(TabValueContext);
  if (value === undefined) {
    throw new Error("useTabValue should be used within Tab");
  }
  return value;
};

export interface TabAction {
  select: () => void;
}

const TabActionContext = createContext<TabAction | undefined>(undefined);

export const useTabAction = () => {
  const action = useContext(TabActionContext);
  if (action === undefined) {
    throw new Error("useTabAction should be used within Tab");
  }
  return action;
};

interface TabContextProviderProps {
  id: string;
  index: number;
  selectedIndex: number;
  children?: React.ReactNode;
  select: (index: number) => void;
}

function TabContextProvider({
  id,
  index,
  selectedIndex,
  children,
  select,
}: TabContextProviderProps) {
  const value = useMemo(
    () => ({ id, index, selectedIndex }),
    [id, index, selectedIndex],
  );

  const action = useMemo(
    () => ({ select: () => select(index) }),
    [select, index],
  );

  return (
    <TabActionContext.Provider value={action}>
      <TabValueContext.Provider value={value}>
        {children}
      </TabValueContext.Provider>
    </TabActionContext.Provider>
  );
}

export type TabRef =
  | {
      el: HTMLDivElement | null;
      select: (index: number) => void;
    }
  | undefined;

export type TabProps = {
  defaultSelectedIndex?: number;
  children?:
    | React.ReactNode
    | ((value: Omit<TabValue, "index">) => React.ReactNode);
} & Omit<JSX.IntrinsicElements["div"], "role" | "children">;

export const Tab = forwardRef<TabRef, TabProps>(
  (
    { children, defaultSelectedIndex = DEFAULT_SELECTED_INDEX, ...props },
    ref,
  ) => {
    const el = useRef<HTMLDivElement>(null);
    const id = useId();
    const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

    const value = useMemo(() => ({ id, selectedIndex }), [id, selectedIndex]);

    useImperativeHandle(
      ref,
      () => ({
        el: el.current,
        select: setSelectedIndex,
      }),
      [],
    );

    return (
      <div ref={el} role="tablist" {...props}>
        {(() => {
          let buttonIndex = 0;
          let panelIndex = 0;

          return Children.map(
            typeof children === "function" ? children(value) : children,
            (child) => {
              if (isValidElement(child) && typeof child.type !== "string") {
                if (child.type.name === TabButton.name) {
                  return (
                    <TabContextProvider
                      id={id}
                      index={buttonIndex++}
                      selectedIndex={selectedIndex}
                      select={setSelectedIndex}
                    >
                      {child}
                    </TabContextProvider>
                  );
                }

                if (child.type.name === TabPanel.name) {
                  return (
                    <TabContextProvider
                      id={id}
                      index={panelIndex++}
                      selectedIndex={selectedIndex}
                      select={setSelectedIndex}
                    >
                      {child}
                    </TabContextProvider>
                  );
                }
              }

              return child;
            },
          );
        })()}
      </div>
    );
  },
);
