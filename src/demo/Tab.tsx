import { Tab } from "src/components/Tab";

export function TabDemo() {
  return (
    <Tab>
      <Tab.Button>button1</Tab.Button>
      <Tab.Button>button2</Tab.Button>
      <Tab.Button>button3</Tab.Button>
      <Tab.Panel>panel1</Tab.Panel>
      <Tab.Panel>panel2</Tab.Panel>
      <Tab.Panel>panel3</Tab.Panel>
    </Tab>
  );
}
