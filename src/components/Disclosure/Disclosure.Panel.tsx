import { useDisclosureValue } from "./Disclosure";

const DEFAULT_TAG = "div" as const;

type ElementProps<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  "id" | "role" | "aria-labelledby"
>;

type DisclosurePanelProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
} & ElementProps<T>;

export function DisclosurePanel<
  T extends keyof JSX.IntrinsicElements = typeof DEFAULT_TAG,
>({ as, children, ...props }: DisclosurePanelProps<T>) {
  const Tag = as ?? "div";
  const { id, opened } = useDisclosureValue();

  return (
    <Tag
      id={`disclosure${id}panel`}
      role="region"
      aria-labelledby={`disclosure${id}button`}
      {...props}
      style={{
        ...props.style,
        ...(!opened && { display: "none" }),
      }}
    >
      {children}
    </Tag>
  );
}
