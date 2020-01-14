const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = env => {
    const isDev = env && env.dev;
    const mode = isDev ? 'development' : 'production';
    const devtool = isDev ? 'inline-source-map' : 'source-map';
    
    function getCacheLoader() {
        if (!isDev) {
            return [];
        }

        return [{
            loader:'cache-loader',
            options: {
                cacheDirectory: path.resolve(__dirname, 'webpack_cache'),
            },
        }];
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
                        ...getCacheLoader(),
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'front/tsconfig.json'),
                            },
                        },
                    ],
                },
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
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        ...getCacheLoader(),
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDev,
                                localsConvention: 'camelCase',
                                importLoaders: 3,
                                modules: {
                                    localIdentName: isDev ? '[name]--[local]--[hash:base64:6]' : '[hash:base64:6]',
                                },
                            },
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                keepQuery: true,
                                // root: path.resolve(__dirname, 'front/src/assets/'),
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    includePaths: ['node_modules'],
                                },
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
            modules: [
                path.resolve(__dirname, 'node_modules'),
            ],
            alias: {
                src: path.resolve(__dirname, 'front/src'),
                shared: path.resolve(__dirname, 'shared'),
                assets: path.resolve(__dirname, 'front/assets'), // для import в ts
                './front': path.resolve(__dirname, 'front'), // для url() в scss
            },
        },
        plugins: [
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
                        ...getCacheLoader(),
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
            new FriendlyErrorsWebpackPlugin(),
        ],
    };

    return [
        frontConfig,
        backConfig,
    ];
};