import { useDisclosureAction, useDisclosureValue } from "./Disclosure";

type DisclosureButtonProps = Omit<
  JSX.IntrinsicElements["button"],
  "id" | "type" | "aria-expanded" | "aria-controls"
>;

export function DisclosureButton({
  children,
  ...props
}: DisclosureButtonProps) {
  const { id, opened } = useDisclosureValue();
  const { toggle } = useDisclosureAction();

  return (
    <button
      id={`disclosure${id}button`}
      type="button"
      aria-expanded={opened}
      aria-controls={`disclosure${id}panel`}
      {...props}
      onClick={(e) => {
        toggle();
        props.onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
