const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};
process.env.BABEL_ENV = TARGET;

const common = {
    //Entry accepts a path or an object of entries. We'll be using
    //the latter form given it's convenient with more complex
    //configurations.
    entry: {
        app: PATHS.app
    },
    //Add resolve.extensions.
    //'' is needed to allow imports without an extension.
    //Note the .'s before extensions as it wil fail to math without!
    resolve:{
        extensions:['','.js','.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                //Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                loaders: ['style', 'css'],
                //Include accepts either a path or an array of paths
                //include: PATHS.app
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            },
            {
                //Set up jsx. This accepts js too thanks to RegExp
                test: /\.jsx?$/,
                //Enable caching for improved performance during developemnt
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']

            }, {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"

            }, {
                test: /\.woff2$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"

            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(eot:call|ttf|svg|gif|png)$/,
                loader: "file-loader"
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    postcss: function(){
        return [autoprefixer({
            browsers: ['last 3 versions']
        })];
    }

};
    // Default configuration
    if(TARGET === 'start' || !TARGET){
        module.exports = merge(common, {
            devtool: 'eval-source-map',
            devServer: {
                contentBase: PATHS.build,

                //Enable history API fallback so HTML5 History API based
                //routing works. This is a good defalutl that will come in
                //handy in more complcated setups.
                historyApiFallback: true,
                hot: true,
                inline: true,
                prgoress: true,
                //Display only errors to reduce the amount of output
                stats: 'errors-only',
                //Parse host and port from env so this is easy to customize.
                //
                //If you use Vagrant or Cloud9, set
                //host: process.env.HOST || '0.0.0.0';
                //
                //0.0.0.0 is available to all network devices unlike default
                //llocalhost
                host: process.env.HOST,
                port: process.env.PORT
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(),
                new NpmInstallPlugin({
                    save: true // --save
                }),
            ],
        });
    }

    if(TARGET === 'build'){
        module.exports = merge(common, {});
    }
