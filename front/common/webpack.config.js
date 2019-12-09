const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: "css/[id].css"
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    resolve: {
        alias: {
            images: path.resolve(__dirname, 'src/assets/images'),
            fonts: path.resolve(__dirname, 'src/assets/fonts'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: function (chunk) {
                //console.log('-----------------------------------------------------------------');
                //console.log(chunk.name);
                return true;
            },
            //minSize: 30000,
            //maxSize: 0,
            //minChunks: 1,
            //maxAsyncRequests: 5,
            //maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    //priority: -30
                },
                /*default: {
                    minChunks: 2,
                    priority: -20,
                    //reuseExistingChunk: true
                }*/
            }
        }
    }
};