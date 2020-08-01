import {terser} from 'rollup-plugin-terser';

export default {
  input: 'dist/true-masonry.js',
  output: [
    {
      file: 'build/js/true-masonry.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ]
};
