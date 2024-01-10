import { Tab as _Tab } from "./Tab";
import { TabButton } from "./Tab.Button";
import { TabPanel } from "./Tab.Panel";

export const Tab = Object.assign(_Tab, {
  Button: TabButton,
  Panel: TabPanel,
});
