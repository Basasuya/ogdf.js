const path = require("path")

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.layout.js$/,
                use: [
                    {
                        loader: path.resolve('./loader/layout-loader.js'),
                    }
                ]
            }
        ]
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
