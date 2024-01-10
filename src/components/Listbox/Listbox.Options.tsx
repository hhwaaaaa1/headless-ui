import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ReactElement,
} from "react";
import type { ListboxOptionProps } from "./Listbox.Option";
import { useListboxAction, useListboxValue } from "./Listbox";

const ListboxOptionIndexContext = createContext<number | undefined>(undefined);

export const useListboxOptionIndex = () => {
  const index = useContext(ListboxOptionIndexContext);
  if (index === undefined) {
    throw new Error(
      "useListboxOptionIndex should be used within Listbox.Options",
    );
  }
  return index;
};

type ListboxOptionsProps = {
  children: Array<
    ReactElement<ListboxOptionProps> | boolean | null | undefined
  >;
} & Omit<JSX.IntrinsicElements["ul"], "id" | "children" | "tabIndex">;

export function ListboxOptions({ children, ...props }: ListboxOptionsProps) {
  const { id, opened } = useListboxValue();
  const { setValues } = useListboxAction();

  setValues(
    Children.toArray(children).reduce<Array<string | number>>((acc, child) => {
      if (isValidElement(child)) {
        return [...acc, child.props.value];
      }
      return acc;
    }, []),
  );

  return (
    <ul
      id={`listbox${id}options`}
      tabIndex={-1}
      {...props}
      style={{
        ...props.style,
        ...(!opened && { display: "none" }),
      }}
    >
      {Children.map(children, (child, index) => (
        <ListboxOptionIndexContext.Provider value={index}>
          {child}
        </ListboxOptionIndexContext.Provider>
      ))}
    </ul>
  );
}
