const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css的插件

// const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
// const HappyPack = require('happypack');





module.exports = {
    entry: {
        examples: './examples/index.ts'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'cache-loader'
                },
                {
                    loader: 'thread-loader',
                    options: {
                        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                        // eslint-disable-next-line global-require
                        workers: require('os').cpus().length - 1
                    }
                },
                {
                    loader: 'ts-loader',
                    options: {
                        // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                        happyPackMode: true
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_module/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
            ]
        }]
        // 精准过滤不需要解析的文件
        // noParse:function(contentPath){
        //     return /three|three.meshline|signals/.test(contentPath);
        // }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // 增加fallback配置是为了解决 jszip与webpack 兼容问题
        fallback: {
            buffer: false,
            stream: require.resolve('stream-browserify')
        }
    },
    externals: [{
        './jszip': 'jszip'
    }],
    output: {
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, '../dist')

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/main.css'
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        // 进度条插件
        new ProgressBarPlugin(),
        // Index.html 模板化
        new HtmlWebpackPlugin({
            template: './examples/templates/template.index.html',
            chunks: ['vendors', 'common', 'examples'],
            filename: 'index.html',
            minify: {
                collapseWhitespace: false
            },
            hash: true
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: path.resolve(__dirname, '../src/assets'),
                    to: path.resolve(__dirname, '../dist/assets'),
                    globOptions: {
                        ignore: ['**/*.scss']
                    }
                },
                {
                    from: path.resolve(__dirname, '../examples/assets'),
                    to: path.resolve(__dirname, '../dist/assets'),
                    globOptions: {
                        ignore: ['**/*.scss']
                    }
                }
            ]
        })
    ],
    optimization: {
        splitChunks: {
            // async异步代码分割 initial同步代码分割 all同步异步分割都开启
            chunks: 'all',
            // 字节 引入的文件大于30kb才进行分割
            minSize: 30000,
            //
            minRemainingSize: 0,
            // 50kb，尝试将大于50kb的文件拆分成n个50kb的文件
            maxSize: 500000,
            // 模块至少使用次数     
            minChunks: 1,
            // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
            maxAsyncRequests: 50,
            // 首页加载的时候引入的文件最多3个
            maxInitialRequests: 30,
            // 缓存组和生成文件名称之间的连接符
            automaticNameDelimiter: '~',
            //
            enforceSizeThreshold: 50000,
            // 缓存组里面的filename生效，覆盖默认命名
            // name: true,
            // 缓存组，将所有加载模块放在缓存里面一起分割打包
            cacheGroups: {
                vendors: {
                    // 自定义打包模块
                    test: /[\\/]node_modules[\\/]/,
                    // 优先级，先打包到哪个组里面，值越大，优先级越高
                    priority: -10,
                    name: 'vendors',
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    // 默认代码打包模块
                    priority: -20,
                    // 模块嵌套引入时，判断是否复用已经被打包的模块
                    reuseExistingChunk: true,
                    name: 'common'
                }
            }
        }
    }
};