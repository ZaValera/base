const path = require('path');
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

       ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    optimization: {
        splitChunks: {
            chunks: function (chunk) {
                console.log('-----------------------------------------------------------------');
                console.log(chunk.name);
                return true;
            },
            minSize: 30000,
            maxSize: 1,
            minChunks: 1,
            //maxAsyncRequests: 5,
            //maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: -30
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};