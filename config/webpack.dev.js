/* 
  1.该文件是webpack的配置文件，所有webpack的任务，用到的loader，plugins都要配置到这里
  2.该文件要符合CJS模块化规范(因为它运行在node上)
*/

// 引入node中内置的一个path模块,专门用于解决路径问题
var path = require('path');
// 基本css loader配置
const baseCssLoader = ['style-loader', 'css-loader']

var HtmlWebpackPlugin = require('html-webpack-plugin');

// 使用cjs模块规范暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
  mode: 'development', // 工作模式
  entry: './src/js/app.js', // 入口
  output: { // 输出
    path: path.resolve(__dirname, 'build'), //输出文件的路径  __dirname指的是当前文件所在文件夹的目录
    filename: 'js/app.js' // 输出文件的名字
  },
  // module.rules中配置的一个一个的loader,rules一个对象就是一个loader
  module: {
    rules: [
      // 配置解析css
      {
        test: /\.css$/,  // 匹配规则 该loader要处理的文件
        use: [ 
          'style-loader',      // 创建style标签，将样式资源插入，添加到head中生效
          'css-loader'         // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
        ]
      },
      // 配置解析less
      {
        test: /\.less$/,  // 匹配规则 该loader要处理的文件
        use: [ 
          ...baseCssLoader,
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'imgs',   // 这样写最好了
              name: '[hash:6].[ext]', // ext表示图片是什么后缀就是什么后缀,我们只保留6位hash值
              limit: 8 * 1024,
              esModule: false
            }
          }
        ]
      },
      {
        exclude: /\.(html|css|less|scss|js|png|jpg|gif|bmp|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'media',   // 这样写最好了
              name: '[hash:6].[ext]', // ext表示图片是什么后缀就是什么后缀,我们只保留6位hash值
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: 'src/index.html'   // 模板所在的位置，不是打包以后index.html的位置
    }
  )],
  devServer: {
    port: 8080,
    open: true, // 自动打开浏览器
    hot:true
  }
};