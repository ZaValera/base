const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(path.resolve(__dirname, 'src'));

module.exports = env => {
    const isDev = env && env.dev;

    const frontConfig = {
        entry: './front/index.tsx',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'front/dist'),
            publicPath: '/dist/',
        },
    };

    const backConfig = {
        entry: './back/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'back/dist'),
            // publicPath: '/dist/',
        },
    };

    const commonConfig = {
        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'inline-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                localsConvention: 'camelCase',
                                importLoaders: 1,
                                modules: {
                                    localIdentName: isDev ? '[name]--[local]--[hash:base64:6]' : '[hash:base64:6]',
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            // modules: [path.resolve(__dirname, './src'), 'node_modules'],
            alias: {
                src: path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[id].css',
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                hash: true,
                inject: true,
                filename: 'index.html',
                template: path.resolve(__dirname, './front/index.html'),
            }),
        ],
    };

    return [
        {
            ...commonConfig,
            ...frontConfig,
        },
        {
            ...commonConfig,
            ...backConfig,
        }
    ];
};