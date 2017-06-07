var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var cwd = process.cwd();
module.exports = {
  entry: {
    app: [
    './webapp/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'//这里和server.js config.output.publicPath 对应是服务端产出路径
  },
  devServer: {
    port:8123
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel-loader?presets[]=react,presets[]=es2015']//未在api中找到此属性的替换方法
      },
      { 
        test: /\.less$/, 
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ] 
      }, 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { 
        test: /.(woff(2)?)(\?[a-z0-9=\.]+)?$/, 
        use: ['url-loader?limit=10000&mimetype=application/font-woff'] 
      },
      { 
        test: /.(eot)(\?[a-z0-9=\.]+)?$/, 
        use: ['file-loader'] 
      },
      { test: /.(ttf)(\?[a-z0-9=\.]+)?$/, 
        use: ['url-loader?limit=10000&mimetype=application/octet-stream'] 
      },
      { 
        test: /.(svg)(\?[a-z0-9=\.]+)?$/, 
        use: ['url-loader?limit=10000&mimetype=image/svg+xml' ]
      },
      { 
        test: /\.(png|jpg|woff|woff2|otf|eot|svg|ttf)$/, 
        use: ['url-loader?limit=8192' ]
      } 
    ]
  },
  resolve: {
    enforceExtension: true,
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      "styles": path.resolve(__dirname,"./webapp/styles"),
      "less": path.resolve(__dirname,"./webapp/styles/less"),
      "constants": path.resolve(__dirname, "./webapp/constants"),
      "images": path.resolve(__dirname, "./webapp/images"),
      "pages": path.resolve(__dirname, "./webapp/pages"),
      "components": path.resolve(__dirname, "./webapp/components"),
      "utils": path.resolve(__dirname, "./webapp/utils")
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: false,
      allChunks: true
    })
  ]
};