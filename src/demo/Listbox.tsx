import { Listbox } from "src/components/Listbox";

export function ListboxDemo() {
  return (
    <Listbox>
      {({ focusedIndex, selectedValue }) => (
        <>
          <Listbox.Button>{selectedValue ?? "SELECT"}</Listbox.Button>
          <Listbox.Options>
            <Listbox.Option value={1}>
              1 {focusedIndex === 0 && "focused"}
            </Listbox.Option>
            <Listbox.Option value={2}>
              2 {focusedIndex === 1 && "focused"}
            </Listbox.Option>
            <Listbox.Option value={3}>
              3 {focusedIndex === 2 && "focused"}
            </Listbox.Option>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}
