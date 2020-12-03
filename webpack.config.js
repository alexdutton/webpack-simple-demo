var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');


const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        main: './entry/main.js',
        roCrate: './entry/roCrate.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-[hash].js",
        publicPath: "/static/bundles/"
    },

    module: {

        rules: [
            {
                test: /.(scss|css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            },    {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new MiniCssExtractPlugin({ filename:'[name]-[chunkhash].css' })
    ],
}
