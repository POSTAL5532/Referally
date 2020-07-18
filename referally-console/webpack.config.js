const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

const fs = require("fs");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const envKeys = getEnvironmentVariables(argv.mode);
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
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new CleanWebpackPlugin(),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
            new ZipPlugin({
                path: '..',
                filename: `referally-console.zip`
            }),

            new webpack.DefinePlugin(envKeys)
        ]
    }
};


function getEnvironmentVariables(mode) {

    // fallback path (.env file)
    const basePath = path.join(__dirname) + '/.env';

    // path to .env.{mode} file
    const envPath = basePath + '.' + mode;

    // if .env.{mode} file doesn't exists fall back to .env file
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    const env = dotenv.config({path: finalPath}).parsed;

    return Object.keys(env)
        .reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(env[next]);
            return prev;
        }, {});
}
