import nodeResolve from '@rollup/plugin-node-resolve';
import commmonJs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sourceMaps from 'rollup-plugin-sourcemaps';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'demo/main.js',
	inlineDynamicImports: false,
	preserveSymlinks: true,
	treeshake: false,
	output: {
		file: 'dist/rxjs.js',
		format: 'es',
	},
	plugins: [
		json(),
		nodeResolve(),
		commmonJs(),
		sourceMaps(),
		terser({
			ecma: 2020,
			format: {
				comments: false
			}
		})
	]
}
