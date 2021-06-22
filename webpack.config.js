const path = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "ogdf.js",
        path: path.resolve(__dirname, "dist"),
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    },
}
