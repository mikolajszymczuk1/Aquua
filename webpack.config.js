const path = require("path");

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.production ? "production": "development",
        entry: "./aquua/js/index.js",
        devtool: "inline-source-map",
        module: {
            rules: [
                {   // HTML
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {   // Styles
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                        ],
                                    ],
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require.resolve("sass"),  // Dart Sass
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: "compressed",
                                },
                            },
                        },
                    ],
                },
                {   // Images
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {   // Fonts
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index-bundle.js",
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./aquua/index.html",
                inject: "body",
                minify: env.m ? true : false,
            }),

            new MiniCssExtractPlugin(),
            new PreloadWebpackPlugin({
                rel: "preload",
                include: "all",
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "dist"),
            },
            compress: true,
            port: 9000,
        },
    }
};