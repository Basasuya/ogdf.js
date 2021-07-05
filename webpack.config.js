const path = require("path")

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.layout.js$/,
                loader: 'layout-loader'
            }
        ]
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, "loader")]
    },
    output: {
        libraryTarget: "umd",
        filename: "ogdf.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    },
}
