const path = require("path");

const HtmlWebpackPlugins = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 模糊匹配路径
const glob = require('glob')

// 自动生成 entry 和 htmlWebpackPlugins
const setMap = () => {
  const entry = {};
  const htmlWebpackPlugins = []
  const cssWebpackPlugins = []
  // 模糊匹配 src 目录下 任意目录下的 index.js 返回的是文件的绝对路径
  const entryFiles = glob.sync(path.join(__dirname, "./src/**/index.js"))
  // 遍历匹配到的结果
  entryFiles.forEach((entryFile) => {
    // console.log(entryFile);
    // 获取到文件名
    const pageName = entryFile.match(/src\/(.*)\/index\.js$/)[1]
    // 生成 entry
    entry[`js/${pageName}`] = entryFile
    // 生成 htmlWebpackPlugins
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugins({
        template: `./src/${pageName}/index.html`,
        filename: `/page/${pageName}/index.html`,
        inject: "body",
        chunks: [pageName]
      }))
    // 生成 MiniCssExtractPlugin
    // cssWebpackPlugins.push(
    //   new MiniCssExtractPlugin({
    //     filename: `css/${pageName}.css`
    //     // 输出的css文件名不变的意思
    //   }),
    // )
  })

  return {
    entry,
    htmlWebpackPlugins,
    cssWebpackPlugins
  }
}
const { entry, htmlWebpackPlugins,cssWebpackPlugins } = setMap()

module.exports = {
  entry,
  // entry: {
  //    'index':"./src/js/index.js",
  //   //  '/css/home':"./src/css/home.css",
  //   //  '/js/3':"./src/js/3.js",
  //   },
  output: {

    environment: {
      // The environment supports arrow functions ('() => { ... }').
      // 环境支持箭头函数('()=>{…}”)。
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      // 该环境支持将BigInt作为文字(123n)。
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      // 环境支持使用const和let声明变量。
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      // 该环境支持async import()函数来导入EcmaScript模块。
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      // 该环境支持'for of' iteration ('for (const x of array){…}”)
      forOf: false,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      // 该环境支持ECMAScript Module语法来导入ECMAScript模块
      module: false,
  },

    //   // 输出文件名
    //   //filename:"built.js",
    
    //   // 输出路径
    //   // __dirname是nodejs中的变量,代表当前文件所在目录对应的绝对路径
    // //path: resolve(__dirname, "build")
    // filename: "[name].js",
    // path: resolve(__dirname, "build")
    path: path.resolve(__dirname, './dist'),
    // 文件名称
    filename: "[name].js"
  
  },
  module:{
    rules: [
        {
          test: /\.(jpe?g|png|gif|webp)$/,
          // asset  通用配置 默认以 8kb 为界限 超过使用 asset/resource 否则使用 asset/inline
          // asset/resource 等同于 file-loader 的作用
          // asset/inline 等同于 url-loader 的作用
          type: "asset/resource",
          // 只有在 asset/resource 才可以设置 generator 属性
          generator: {
            filename: "images/[name][ext]",
          },
          parser: {
            dataUrlCondition: {
              // 只有在 asset 设置 maxSize 属性才会生效
              maxSize: 1 * 1024
            }
          }
        },

        {
            test: /\.(css|less)$/,
            use: ["style-loader",{
              loader: MiniCssExtractPlugin.loader,
              options: {
                  esModule: false,
              },
          }, "css-loader", "less-loader",],
 
          },
      ],
    
    },
  plugins: [
    new CleanWebpackPlugin(),

    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",  // 模板是哪个html文件
    //   filename: "index.html",  // 打包后生成的html文件名称
    //   inject: "body",  // js文件的位置，这里放入了body标签中
    // }),
    ...htmlWebpackPlugins,
    // ...cssWebpackPlugins
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
        // 输出的css文件名不变的意思
      }),
      
  ],

  devServer: {
    static: "./dist",
  },
   
  optimization: {
        minimizer: [new CssMinimizerWebpackPlugin()],
    },
  mode: "none",
};
