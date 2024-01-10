import { createRoot } from "react-dom/client";
import * as components from "./src";
import { DisclosureDemo } from "src/demo/Disclosure";
import { TabDemo } from "src/demo/Tab";
import { ListboxDemo } from "src/demo/Listbox";

document.body.innerHTML = '<div id="app"></div>';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("app")!);
root.render(
  <>
    <DisclosureDemo />
    <TabDemo />
    <ListboxDemo />
  </>,
);

console.log(Object.keys(components));
