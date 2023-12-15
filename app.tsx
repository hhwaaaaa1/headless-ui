import { createRoot } from 'react-dom/client';
import * as components from './src';

document.body.innerHTML = '<div id="app"></div>';
const root = createRoot(document.getElementById('app')!);
root.render(<h1>Demo Page</h1>);

console.log(Object.keys(components));
