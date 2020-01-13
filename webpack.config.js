const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = env => {
    const isDev = env && env.dev;
    const mode = isDev ? 'development' : 'production';
    const devtool = isDev ? 'inline-source-map' : 'source-map';

    function addCache(config) {
        if (!isDev) {
            return config;
        }

        for (const item of config.module.rules) {
            item.use.unshift({
                loader:'cache-loader',
                options: {
                    cacheDirectory: path.resolve(__dirname, 'webpack_cache'),
                },
            });
        }

        return config;
    }

    const frontConfig = {
        mode,
        devtool,
        target: 'web',
        entry: './front/src/index.tsx',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'front/build'),
            publicPath: '/build/',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'front/tsconfig.json'),
                            },
                        },
                    ],
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
                                sourceMap: isDev,
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
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    path.resolve(__dirname, 'front/src/styles/vars.scss'),
                                    path.resolve(__dirname, 'front/src/styles/mixins.scss'),
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.tsx', '.ts'],
            // modules: ['front/node_modules'],
            alias: {
                src: path.resolve(__dirname, './front/src'),
                shared: path.resolve(__dirname, './shared'),
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new FriendlyErrorsWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[id].css',
            }),
            new HtmlWebpackPlugin({
                hash: true,
                inject: true,
                filename: 'index.html',
                template: path.resolve(__dirname, './front/src/index.html'),
            }),
        ],
    };

    const backConfig = {
        mode,
        devtool,
        target: 'node',
        entry: './back/src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'back/build'),
            publicPath: '/build/',
        },
        node: {
            __dirname: false,
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'back/tsconfig.json'),
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            // modules: ['node_modules'],
            alias: {
                src: path.resolve(__dirname, './back/src'),
                shared: path.resolve(__dirname, './shared'),
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new FriendlyErrorsWebpackPlugin(),
        ],
    };

    return [
        addCache(frontConfig),
        addCache(backConfig),
    ];
};