const path = require('path');
const {
  merge
} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    /** 默认首页 */
    index: 'index.html',
    /** 启动服务后 是否打开网页 */
    open: false,
    /** 打开哪个页面 */
    openPage: '/index.html',
    /** 静态资源根目录 */
    contentBase: path.resolve(__dirname, 'dist'),
    // 启用数据压缩
    compress: true,
    /** 监听IP地址 */
    host: '0.0.0.0',
    /** 监听端口 */
    port: 8000,
    // 自定义Http头
    headers: {
      'X-Custom-Foo': 'bar'
    },
    // 404响应重定向
    historyApiFallback: {
      rewrites: [
        /** editor 重定向 */
        { from: /^\/editor/, to: '/editor.html' },
        /** 其他页面 重定向 */
        { from: /./, to: '/index.html' }
      ]
    },
    // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果您只想显示编译器错误
    overlay: {
      warnings: true,
      errors: true
    },
    // 静态选项
    staticOptions: {
      redirect: false
    }

  }
});