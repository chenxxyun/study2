const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
  
module.exports = {
  entry: {
     'index':"./src/js/index.js",
    //  '/css/home':"./src/css/home.css",
    //  '/js/3':"./src/js/3.js",
    },
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

    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  
  },
  module:{
    rules: [
        {
            test: /\.png$/,
            // 导出单独文件
            type: "asset/resource",
            generator: {
              filename: "images/[contenthash][ext]",
            },
          },
        {
            test: /\.jpg$/,
            type: "asset/resource",
            generator: {
                filename: "images/[contenthash][ext]",// 设置生成的目录即名称，根据文件名生成哈希值并保持原来的扩展名
            },
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
    new HtmlWebpackPlugin({
      template: "./src/index.html",  // 模板是哪个html文件
      filename: "index.html",  // 打包后生成的html文件名称
      inject: "body",  // js文件的位置，这里放入了body标签中
    }),
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
