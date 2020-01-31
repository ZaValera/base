const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {getCommonLoaders, getParams} = require('./webpack.utils');


module.exports = env => {
    const {
        isDev,
        dirname,
        mode,
        devtool,
        storybook,
    } = getParams(env);

    let plugins = [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
    ];

    if (!storybook) {
        plugins.push(
            new HtmlWebpackPlugin({
                hash: true,
                inject: true,
                filename: 'index.html',
                template: path.resolve(dirname, './front/src/index.html'),
            }),
            new FriendlyErrorsWebpackPlugin(),
        );
    }

    return {
        mode,
        devtool,
        plugins,
        target: 'web',
        entry: './front/src/index.tsx',
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: path.resolve(dirname, 'front/build'),
            publicPath: '/build/',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        ...getCommonLoaders(dirname, isDev),
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(dirname, 'front/tsconfig.json'),
                                experimentalWatchApi: true,
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
                    test: /\.css$/,
                    use: [
                        ...getCommonLoaders(dirname, isDev),
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        ...getCommonLoaders(dirname, isDev),
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
                                    path.resolve(dirname, 'front/src/styles/vars.scss'),
                                    path.resolve(dirname, 'front/src/styles/mixins.scss'),
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
                path.resolve(dirname, 'node_modules'),
            ],
            alias: {
                src: path.resolve(dirname, 'front/src'),
                shared: path.resolve(dirname, 'shared'),
                assets: path.resolve(dirname, 'front/assets'), // для import в ts
                './front': path.resolve(dirname, 'front'), // для url() в scss
            },
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    default: {
                        reuseExistingChunk: true,
                    },
                    index: {
                        reuseExistingChunk: true,
                        test: /front\/src\/components.*\.tsx?$/,
                        name: 'components',
                        chunks: 'all',
                        enforce: true,
                    },
                    // Возможно в этом чанке нет смысла
                    styles: {
                        name: 'styles',
                        test: /\.scss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    node_modules: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        minSize: 50000, // Все модули меньше 50 Кб будут попадать в main чанк
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm/${packageName.replace('@', '')}`;
                        },
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                }
            },
        },
    };
};