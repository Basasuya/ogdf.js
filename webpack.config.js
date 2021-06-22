const path = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "ogdf.js",
        path: path.resolve(__dirname, "dist"),
    },
}
