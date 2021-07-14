const path = require("path")
const webpack = require("webpack")
module.exports = {
    entry: {
        "ogdf": "../src/index.js",
        "ogdf-react": "./components/index.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.layout.js$/,
                use: [
                    {
                        loader: path.resolve('../loader/layout-loader.js'),
                    }
                ]
            }
        ]
    },
    output: {
        libraryTarget: "umd",
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    },
}