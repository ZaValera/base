const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {getCommonLoaders, getParams} = require('./webpack.utils');


module.exports = env => {
    const {
        isDev,
        dirname,
        mode,
        devtool,
        storybook,
        hmr,
    } = getParams(env);

    let plugins = [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
    ];

    if (!storybook) {
        plugins.push(
            new HtmlWebpackPlugin({
                hash: true,
                inject: true,
                alwaysWriteToDisk: hmr,
                filename: 'index.html',
                favicon: path.resolve(dirname, './front/assets/images/favicon.ico'),
                template: path.resolve(dirname, './front/src/index.html'),
            }),
            new FriendlyErrorsWebpackPlugin(),
        );

        if (hmr) {
            plugins.push(
                new webpack.HotModuleReplacementPlugin(),
                new HtmlWebpackHarddiskPlugin(),
            );
        }
    }

    const commonLoaders = getCommonLoaders(dirname, isDev, hmr);

    const entry = ['./front/src/index.tsx'];

    if (hmr) {
        entry.push('webpack-hot-middleware/client');
    }

    return {
        mode,
        devtool,
        plugins,
        entry,
        target: 'web',
        output: {
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
            path: path.resolve(dirname, 'front/build'),
            publicPath: '/build/',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        ...commonLoaders,
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
                        ...commonLoaders,
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        ...commonLoaders,
                        /*{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr,
                                // reloadAll: true,
                            },
                        },*/
                        hmr ? 'style-loader' : MiniCssExtractPlugin.loader,
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