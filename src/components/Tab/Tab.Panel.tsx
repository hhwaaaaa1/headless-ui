import { useTabValue } from "./Tab";

const DEFAULT_TAG = "div" as const;

type ElementProps<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  "id" | "ref" | "role" | "tabIndex" | "aria-labelledby"
>;

type TabPanelProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
} & ElementProps<T>;

export function TabPanel<
  T extends keyof JSX.IntrinsicElements = typeof DEFAULT_TAG,
>({ as, children, ...props }: TabPanelProps<T>) {
  const Tag = as ?? "div";
  const { id, index, selectedIndex } = useTabValue();
  const selected = index === selectedIndex;

  return (
    <Tag
      id={`tab${id}panel-${index}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab${id}button-${index}`}
      {...props}
      style={{
        ...props.style,
        ...(!selected && { display: "none" }),
      }}
    >
      {children}
    </Tag>
  );
}
