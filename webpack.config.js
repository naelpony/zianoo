const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  context: path.resolve(__dirname, 'src'),
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: {
    index: [
      '@babel/polyfill',
      './index.js',
    ],
    script: [
      './js/script.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    assetModuleFilename: devMode ? 'img/[name].[ext]' : 'img/[name].[contenthash].[ext]',

  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
          'css-loader',
          'sass-loader',
        ],
        type: 'javascript/auto'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: devMode ? 'img/[name].[ext]' : 'img/[name].[contenthash].[ext]'
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: devMode ? 'svg/[name].[ext]' : 'svg/[name].[contenthash].[ext]' 
        },
      },
      {
        test: /\.(ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: devMode ? 'fonts/[name].[ext]' : 'fonts/[name].[contenthash].[ext]'
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
};