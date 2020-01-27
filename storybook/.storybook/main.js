const webpackConfig = require('../../webpack.config');
const path = require('path');

module.exports = {
    stories: ['../stories/*.[tj]sx'],
    webpackFinal: (config) => {
        const mainConfig = webpackConfig({
            dev: false,
            dirname: path.resolve(__dirname, '../..'),
        })[0];

        return {
            ...config,
            module: {
                ...config.module,
                rules: mainConfig.module.rules,
            },
            resolve: {
                ...config.resolve,
                extensions: [
                    ...config.resolve.extensions,
                    ...mainConfig.resolve.extensions,
                ],
                modules: [
                    ...config.resolve.modules,
                    ...mainConfig.resolve.modules,
                ],
                alias: {
                    ...config.resolve.alias,
                    ...mainConfig.resolve.alias,
                },
            },
            plugins: [
                ...config.plugins,
                mainConfig.plugins[0], // Только MiniCssExtractPlugin
            ],
        };
    },
};