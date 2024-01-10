import type { KeyboardEvent } from "react";
import { useTabAction, useTabValue } from "./Tab";
import { escapeColon } from "src/utils/id";

type TabButtonProps = Omit<
  JSX.IntrinsicElements["button"],
  "id" | "type" | "role" | "tabIndex" | "aria-controls" | "aria-selected"
>;

export function TabButton({ children, ...props }: TabButtonProps) {
  const { id, index, selectedIndex } = useTabValue();
  const { select } = useTabAction();
  const selected = index === selectedIndex;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const buttons = document.querySelectorAll(
        `[id^='tab${escapeColon(id)}button-']`,
      );
      const prevButton = buttons[index > 0 ? index - 1 : buttons.length - 1];
      (prevButton as HTMLElement)?.focus();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const buttons = document.querySelectorAll(
        `[id^='tab${escapeColon(id)}button-']`,
      );
      const nextButton = buttons[index < buttons.length - 1 ? index + 1 : 0];
      (nextButton as HTMLElement)?.focus();
    }
  };

  return (
    <button
      id={`tab${id}button-${index}`}
      type="button"
      role="tab"
      tabIndex={selected ? 0 : -1}
      aria-controls={`tab${id}panel-${index}`}
      aria-selected={selected}
      {...props}
      onClick={(e) => {
        select();
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
