const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                test: /.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    //priority: -30
                },
            }
        }
    }
};