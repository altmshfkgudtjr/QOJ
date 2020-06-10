const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname)
                ],
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-syntax-object-rest-spread',
                            '@babel/plugin-transform-spread'
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: [__dirname, path.join(__dirname, '/dist/')],
        inline: true,
        hot: true,
        host: "0.0.0.0",
        port: 8000,
        historyApiFallback: {
             rewrites: [
                { from: /^\/$/, to: '/index.html' }
            ]
        },
        proxy: {
            '/API': {
                target: "http://localhost:5000",
                changeOrigin: false,
            }
        }
    },
    mode: 'development'
};