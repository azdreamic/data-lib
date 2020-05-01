var path = require('path');

const umd = {
    mode: 'none',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'output/umd'),
        libraryTarget: 'umd',
        filename: 'index.js'
    }
};

const amd = {
    mode: 'none',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'output/amd'),
        libraryTarget: 'amd',
        filename: 'index.js'
    }
};

const commonjs = {
    mode: 'none',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'output/commonjs'),
        filename: 'index.js',
        libraryTarget: 'commonjs',
    }
};

const commonjs2 = {
    mode: 'none',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'output/commonjs2'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    }
};

const commonjsmod = {
    mode: 'none',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'output/es2015'),
        filename: 'index.js',
        libraryTarget: 'commonjs-module',
    }
};

const es = {
    mode: 'none',
    entry: './dist/index.js',
    output: {
        path: path.resolve(__dirname, 'output/es'),
        filename: 'index.js',
        library: '__MODULE_DEFAULT_EXPORT__',
        libraryTarget: 'window',
        libraryExport: 'default'
    }
};



module.exports = [umd, amd, commonjs, commonjs2, es, commonjsmod];
