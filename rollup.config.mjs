import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
	input: 'src/index.js',
	output: {
		dir: 'build',
		format: 'es'
	},
	external: [/@babel\/runtime/],
	plugins: [
		resolve(),
		babel({ 
			babelHelpers: 'runtime',
			presets: ["@babel/preset-env", "@babel/preset-react"],
			plugins: ["@babel/plugin-transform-runtime"],
		})
	]
};
