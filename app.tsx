import { createRoot } from "react-dom/client";
import * as components from "./src";

document.body.innerHTML = '<div id="app"></div>';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("app")!);
root.render(<h1>Demo Page</h1>);

console.log(Object.keys(components));
