const path = require("path")
const webpack = require("webpack")
module.exports = {
    entry: "./components/index.js",
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
        ]
    },
    output: {
        libraryTarget: "umd",
        filename: "ogdf-react.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ],
}