const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name]_[hash].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name]_[hash].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            modules: true,
                            camelCase: true,
                            localIdentName: '[name]-[local]-[hash:base64:6]'
                        },
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            'resolve url': true,
                            import: [
                                'vars.styl',
                                'mixins.styl',
                            ],
                            paths: [
                                path.resolve(__dirname, './src/assets'),
                                path.resolve(__dirname, './src/style'),
                            ],
                        },
                    },
                ],
            },
       ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: "css/[id].css"
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    resolve: {
        alias: {
            images: path.resolve(__dirname, 'src/assets/images'),
            fonts: path.resolve(__dirname, 'src/assets/fonts'),
        },
    },
};