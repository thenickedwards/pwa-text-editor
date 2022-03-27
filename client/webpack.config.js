const HtmlWebpackPlugin = require('html-webpack-plugin');
// ADDED:
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// DONE: Add and configure workbox plugins for a service worker and manifest file.
// DONE: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // REF: 19.2.20 - Inject Manifest
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE Text Editor',
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //////////
      // REF: 19.3.26 - Manifest
      new WebpackPwaManifest({
        name: 'JATE - Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Just Another Text Editor!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: '/',
        publicPath: '/',
        // icons: [
        //   {
        //     src: path.resolve('assets/images/logo.png'),
        //     sizes: [96, 128, 192, 256, 384, 512],
        //     destination: path.join('assets', 'icons'),
        //   },
        // ],
      }),
      //////////
    ],

    module: {
      rules: [
        // Pulled 19.2.20 - Inject Manifest
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        //////////
      ],
    },
  };
};
