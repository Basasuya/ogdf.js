const path = require("path")

module.exports = {
    entry: "./components/index.js",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader'
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
}