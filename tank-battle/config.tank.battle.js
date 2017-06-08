var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var cwd = process.cwd();
module.exports = {
  entry: [
    './webapp/main.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
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
        use:[
          {
            loader:'react-hot-loader'
          },
          {
            loader:'babel-loader',
            options:{
              presets:'react',
              presets:'es2015'
            }
          }
        ],
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
        use: [
          loader:'url-loader',
          options:         
          {
            limit:10000,
            mimetype:'application/font-woff'
          }  
        ] 
      },
      { 
        test: /.(eot)(\?[a-z0-9=\.]+)?$/, 
        use: ['file-loader'] 
      },
      { test: /.(ttf)(\?[a-z0-9=\.]+)?$/, 
        use: [
          loader:'url-loader',
          options:
          {
            limit:10000,
            mimetype:'application/octet-stream'
          }
        ] 
      },
      { 
        test: /.(svg)(\?[a-z0-9=\.]+)?$/, 
        use: [
          loader:'url-loader',
          options:
          {
            limit:10000,
            mimetype:'image/svg+xml'
          }
        ] 
      },
      { 
        test: /\.(png|jpg|woff|woff2|otf|eot|svg|ttf)$/, 
        use: [
          loader:'url-loader',
          options:
          {
            limit:8192
          }
        ]
      } 
    ]
  },
  resolve: {
    enforceExtension: true,
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      "styles": path.join(cwd,"./webapp/styles"),
      "less": path.join(cwd,"./webapp/styles/less"),
      "constants": path.join(cwd, "./webapp/constants"),
      "images": path.join(cwd, "./webapp/images"),
      "pages": path.join(cwd, "./webapp/pages"),
      "components": path.join(cwd, "./webapp/components"),
      "utils": path.join(cwd, "./webapp/utils")
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