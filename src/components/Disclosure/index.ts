import { Disclosure as _Disclosure, useDisclosureRef } from "./Disclosure";
import { DisclosureButton } from "./Disclosure.Button";
import { DisclosurePanel } from "./Disclosure.Panel";

export const Disclosure = Object.assign(_Disclosure, {
  Button: DisclosureButton,
  Panel: DisclosurePanel,
});

export { useDisclosureRef };
