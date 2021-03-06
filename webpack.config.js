const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: [
      '@babel/polyfill',
      './index.js',
    ],
    script: [
      './js/script.js',
    ],
    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist/'),
      publicPath: '/',
    },
    open: true,
    compress: true,
    hot: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      publicPath: './',
      inject: 'body',
    }),
  ],
  module: {
    rules: [{
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: ImageMinimizerPlugin.loader,
          options: {
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  "imagemin-gifsicle",
                  "imagemin-mozjpeg",
                  "imagemin-pngquant",
                ],
              },
            },
          },
        }, ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
};