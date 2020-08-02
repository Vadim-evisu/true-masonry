import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/true-massonry.js',
  output: [
    {
      file: 'build/js/true-masonry.min.js',
      format: 'iife',
      name: 'version',
      plugins: [
        resolve(),
        terser()
      ]
    }
  ]
};
