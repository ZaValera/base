const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

console.log(path.resolve(__dirname, 'src'));

module.exports = env => {
    const isDev = env && env.dev;

    return {
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'inline-source-map' : 'source-map',
        target: 'node',
        node: {
            __dirname: false,
        },
        externals: [nodeExternals()],
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/build/',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                shared: path.resolve(__dirname, '../shared/build')
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
    }
};