import { useListboxAction, useListboxValue } from "./Listbox";
import { useListboxOptionIndex } from "./Listbox.Options";

export type ListboxOptionProps = {
  value: string | number;
} & Omit<JSX.IntrinsicElements["li"], "role" | "aria-selected">;

export function ListboxOption({
  value,
  children,
  ...props
}: ListboxOptionProps) {
  const { id, selectedValue } = useListboxValue();
  const { close, focus, select } = useListboxAction();
  const index = useListboxOptionIndex();

  return (
    <li
      id={`listbox${id}option-${value}`}
      role="option"
      aria-selected={selectedValue === value}
      {...props}
      onClick={(e) => {
        select(value);
        focus(index);
        close();
        props.onClick?.(e);
      }}
    >
      {children}
    </li>
  );
}
