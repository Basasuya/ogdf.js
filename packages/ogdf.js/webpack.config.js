const path = require('path')

module.exports = {
    mode: 'development',
    entry: { ogdf: './src/index.js' },
    output: {
        libraryTarget: 'umd',
        library: 'ogdf',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        umdNamedDefine: true
    },
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    }
}
