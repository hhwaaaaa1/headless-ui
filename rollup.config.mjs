import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'es'
	},
	external: [/@babel\/runtime/],
	plugins: [
		commonjs(),
		nodeResolve(),
		typescript(),
		babel({ 
			babelHelpers: 'runtime',
			presets: [
				"@babel/preset-env",
				"@babel/preset-react",
				"@babel/preset-typescript"
			],
			plugins: ["@babel/plugin-transform-runtime"],
		}),
		peerDepsExternal()
	]
};
