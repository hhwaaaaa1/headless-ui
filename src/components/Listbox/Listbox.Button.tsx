import { useEffect, type KeyboardEvent, useRef } from "react";
import { useListboxAction, useListboxValue } from "./Listbox";
import { escapeColon } from "src/utils/id";

type ListboxButtonProps = Omit<
  JSX.IntrinsicElements["button"],
  | "id"
  | "type"
  | "role"
  | "aria-haspopup"
  | "aria-expanded"
  | "aria-controls"
  | "aria-activedescendant"
>;

export function ListboxButton({ children, ...props }: ListboxButtonProps) {
  const el = useRef<HTMLButtonElement>(null);
  const { id, values, size, opened, focusedIndex, selectedValue } =
    useListboxValue();
  const { open, close, toggle, focus, select } = useListboxAction();

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if (opened) {
        select(values[focusedIndex]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!opened) {
        open();
      } else {
        focus(Math.min(focusedIndex + 1, size - 1));
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!opened) {
        open();
      } else {
        focus(Math.max(focusedIndex - 1, 0));
      }
    }
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  useEffect(() => {
    const handleBlur = (e: FocusEvent | MouseEvent) => {
      if (e.target === null) return;
      if (e.target === el.current) return;
      if (
        (
          document.querySelector(
            `#listbox${escapeColon(id)}options`,
          ) as HTMLElement
        )?.contains(e.target as HTMLElement)
      ) {
        return;
      }
      close();
    };

    window.addEventListener("click", handleBlur);
    window.addEventListener("focusin", handleBlur);

    return () => {
      window.removeEventListener("click", handleBlur);
      window.removeEventListener("focusin", handleBlur);
    };
  }, [close]);

  return (
    <button
      ref={el}
      id={`listbox${id}button`}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={opened}
      aria-controls={`listbox${id}options`}
      aria-activedescendant={
        selectedValue !== undefined && opened
          ? `listbox${id}option-${selectedValue}`
          : undefined
      }
      {...props}
      onClick={(e) => {
        toggle();
        props.onClick?.(e);
      }}
      onKeyDown={(e) => {
        handleKeydown(e);
        props.onKeyDown?.(e);
      }}
    >
      {children}
    </button>
  );
}
