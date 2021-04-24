var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
    entry: ["./src/index.jsx"],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                loader: "url-loader?limit=100000",
            },
            {
                // ASSET LOADER
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "file-loader",
            },
            {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "../../build",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true,
            delay: 2500,
        }),
    ],
    output: {
        path: __dirname + "/../build",
        filename: "bundle.js",
    },
};
