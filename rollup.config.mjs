// @ts-check

import terser from '@rollup/plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import packageJSON from './package.json' assert { type: 'json' };

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${packageJSON.name} v${packageJSON.version}
 * (c) ${packageJSON.author}
 * Released under the ${packageJSON.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
* @param {import('rollup').OutputOptions} options
* @returns {import('rollup').OutputOptions}
*/
function createOutputOptions(options) {
  return {
    banner,
    name: '[libraryCamelCaseName]',
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/**
* @type {import('rollup').RollupOptions}
*/
const options = {
  input: './src/index.ts',
  output: [
    createOutputOptions({
      file: './dist/bundle.js',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/bundle.cjs',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/bundle.mjs',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/bundle.umd.js',
      format: 'umd',
    }),
    createOutputOptions({
      file: './dist/bundle.umd.min.js',
      format: 'umd',
      plugins: [terser()],
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
  external: ['rxjs']
};

export default options;