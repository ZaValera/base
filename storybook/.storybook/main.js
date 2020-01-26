const webpackConfig = require('../../webpack.config');

module.exports = {
    stories: ['../stories/*.[tj]s'],
    webpackFinal: (config) => {

        return config;
        /*const mainConfig = webpackConfig({dev: false})[0];

        return {
            ...config,
            mode: 'development',
            module: {
                ...config.module,
                rules: [
                    ...mainConfig.module.rules,
                ],
            },
            resolve: mainConfig.resolve,
            plugins: [
                ...config.plugins,
                ...mainConfig.plugins,
            ],
        };*/
    },
};