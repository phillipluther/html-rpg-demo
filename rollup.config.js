import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

const PROD = process.env.NODE_ENV === 'production';


export default {
    input: 'src/main.js',
    output: {
        file: 'demo/bundle.js',
        format: 'iife',
        sourcemap: PROD ? true : 'inline'
    },
    plugins: [
        nodeResolve(),
        postcss({
            extract: PROD ? 'demo/styles.css' : false,
            minimize: PROD,
            sourceMap: PROD ? true : 'inline'
        }),
        PROD && terser(),
        (PROD === false) && serve({
            contentBase: 'demo',
            port: 8080
        }),
        (PROD === false) && livereload({
            watch: 'demo'
        })
    ]
}
