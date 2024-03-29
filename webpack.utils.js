const path = require('path');

exports.getCommonLoaders = function (dirname, isDev, hmr) {
    const loaders = [];

    if (isDev && !hmr) {
        loaders.push({
            loader:'cache-loader',
            options: {
                cacheDirectory: path.resolve(dirname, 'webpack_cache'),
            },
        });
    }

    return loaders;
};

exports.getParams = function (env) {
    const isDev = env && env.dev;
    const dirname = env && env.dirname || __dirname;
    const mode = isDev ? 'development' : 'production';
    const devtool = isDev ? 'inline-source-map' : 'source-map';
    const storybook = env && env.storybook;
    const hmr = env && env.hmr;

    return {
        isDev,
        dirname,
        mode,
        devtool,
        storybook,
        hmr,
    };
};