import { Listbox as _Listbox } from "./Listbox";
import { ListboxButton } from "./Listbox.Button";
import { ListboxOption } from "./Listbox.Option";
import { ListboxOptions } from "./Listbox.Options";

export const Listbox = Object.assign(_Listbox, {
  Button: ListboxButton,
  Options: ListboxOptions,
  Option: ListboxOption,
});
