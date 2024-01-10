import { Disclosure } from "../components/Disclosure";

export function DisclosureDemo() {
  return (
    <Disclosure onToggle={console.log}>
      <Disclosure.Button>aa</Disclosure.Button>
      <Disclosure.Panel>aa</Disclosure.Panel>
    </Disclosure>
  );
}
