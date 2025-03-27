import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'wwwroot/js/dist/main.js',
    output: {
        file: 'wwwroot/js/dist/bundle.js',
        format: 'iife', // Immediately-invoked function expression format
        sourcemap: true,
        name: 'StokApp', // Use StokApp as the namespace to match your code
        extend: true,
        globals: {
            document: 'document',
            window: 'window',
            console: 'console'
        }
    },
    plugins: [
        nodeResolve({
            // This ensures all dependencies are bundled
            browser: true,
            preferBuiltins: false
        })
    ],
    // This ensures all modules are included in the bundle
    treeshake: {
        moduleSideEffects: 'no-external'
    },
    onwarn: function (warning, warn) {
        // Skip certain warnings
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        warn(warning);
    }
};
