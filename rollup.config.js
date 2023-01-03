'use strict';

import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/fquery.js',
        format: 'umd',
        name: 'fQuery',
        sourcemap: true,
    },
    plugins: [nodeResolve()],
};
