'use strict';

module.exports = {
    devtools: 'source-map',

    entry: __dirname + '/src/js/App.js',

    output: {
        filename: 'main.js',
        path: __dirname + '/public/js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loaders: ['babel-loader'],
            }
        ],
    },
}