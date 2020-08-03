const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const fs = require("fs");
const dotenv = require("dotenv");
const webpack = require("webpack");

let mode;

module.exports = (env, argv) => {
    mode = argv.mode;
    dotenv.config();

    return {
        entry: {
            app: path.join(__dirname, "src", "index.tsx")
        },
        target: "web",
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules|test/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.less$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.html$/,
                    use: [{loader: "html-loader"}]
                },
                {
                    test: /\.(png|jpg|svg|gif)$/,
                    use: ["file-loader"]
                },
                {
                    test: /\.(ttf|woff|woff2|eot)$/,
                    use: ["file-loader"]
                }
            ],
        },
        resolve: {
            modules: [
                "node_modules",
                path.resolve("./src")
            ],
            extensions: [".tsx", ".ts", ".js"],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, "build/dist"),
            publicPath: "/"
        },
        devServer: {
            port: process.env.DEV_SERVER_PORT,
            historyApiFallback: true,
            host: "localhost",
            disableHostCheck: true
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./public/index.ejs",
                filename: "./index.html"
            }),
            new CleanWebpackPlugin(),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
            new CopyPlugin({
                patterns: [
                    {
                        from: getEnvironmentFilePath(argv.mode),
                        to: './props.js'
                    }
                ]
            })
        ]
    }
};

function getEnvironmentFilePath(mode) {
    const modeEnvPath = path.resolve("public", `${mode}.props.js`);
    const defaultEnvPath = path.resolve("public/props.js");
    return fs.existsSync(modeEnvPath) ? modeEnvPath : defaultEnvPath;
}
