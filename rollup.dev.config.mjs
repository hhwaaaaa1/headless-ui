import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import livereload from 'rollup-plugin-livereload';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'app.tsx',
	output: {
		dir: 'demo',
		format: 'es'
	},
	plugins: [
		commonjs(),
		nodeResolve(),
		typescript({
      compilerOptions: {
        declaration: false,
        declarationDir: undefined,
      }
    }),
		babel({ 
			babelHelpers: 'bundled',
			presets: [
				"@babel/preset-env",
				"@babel/preset-react",
				"@babel/preset-typescript"
			],
		}),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    html({
      title: 'Headless UI',
    }),
    serve({
      contentBase: 'demo',
      open: true,
      port: 8080,
    }),
    livereload()
	]
};
