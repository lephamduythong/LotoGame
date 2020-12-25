const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const sassVars = require('../src/app/style/theme.ts');
const {
  prod_Path,
  src_Path
} = require('./path');
const {
  selectedPreprocessor
} = require('./loader');

module.exports = {
  devServer: {
		open: true,
    stats: 'errors-only'
	},
  entry: {
    main: './' + src_Path + '/index.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: '[name].[chunkhash].js',
  },
  devtool: 'source-map',
  devServer: {
    open: false,
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: selectedPreprocessor.fileRegexp,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: selectedPreprocessor.loaderName,
          options: {
            sourceMap: true,
            functions: {
              "get($keys)": function(keys) {
                keys = keys.getValue().split(".");
                let result = sassVars;
                let i;
                for (i = 0; i < keys.length; i++) {
                  result = result[keys[i]];
                }
                result = sassUtils.castToSass(result);
                return result;
              }
            }
          },
        },
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './' + src_Path + '/index.html',
      filename: 'index.html'
    })
  ]
};