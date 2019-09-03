import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin-legacy';

import getClientEnvironment from './env';
import paths from './paths';
import { prodStyleLoader } from './styleLoader';

const env = getClientEnvironment();

const shouldMinifyHtml = true;
const shouldUseSourceMap = false;

module.exports = {
  // This option controls if and how source maps are generated.
  // use the option 'eval-source-map' if you prefer to see the original source code in devtools
  // see https://webpack.js.org/configuration/devtool/ for more info
  devtool: shouldUseSourceMap ? 'source-map' : false,

  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: {
    main: ['babel-polyfill', './src/styles/index.scss', './src/js/main.js']
    //vendor: ['jquery'],
  },

  output: {
    // This options is not used in dev but WebpackDevServer crashes without it
    path: paths.appPublic,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].[chunkhash:8].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    // Webpack uses `publicPath` to determine where the app is being served from.
    // In development, we always serve from an absolute path to allow fonts to be loaded correctly
    // https://github.com/webpack-contrib/style-loader/issues/55
    publicPath: ''
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'assets/img/[name].[hash:8].[ext]'
            }
          },
          // SVG Images - use 'raw-loader' for all images inside 'img/symbols'
          {
            test: /\.svg$/,
            include: path.join(__dirname, '../src/assets/img/symbols'),
            loader: require.resolve('raw-loader')
          },
          // SVG Images - use 'file-loader' for other SVG's
          {
            test: /\.svg$/,
            include: path.join(__dirname, '../src/assets/img'),
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/img/[name].[hash:8].[ext]'
            }
          },
          // FONTS
          {
            test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.svg$/],
            include: path.join(__dirname, '../src/assets/fonts'),
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/fonts/[name].[ext]'
            }
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, '../src/js'),
            loader: require.resolve('babel-loader'),
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: false,
              compact: true
            }
          },
          {
            test: /\.scss$/,
            loader: prodStyleLoader
          },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new TerserPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: shouldMinifyHtml,
        collapseWhitespace: shouldMinifyHtml,
        removeRedundantAttributes: shouldMinifyHtml,
        useShortDoctype: shouldMinifyHtml,
        removeEmptyAttributes: shouldMinifyHtml,
        removeStyleLinkTypeAttributes: shouldMinifyHtml,
        keepClosingSlash: shouldMinifyHtml,
        minifyJS: shouldMinifyHtml,
        minifyCSS: shouldMinifyHtml,
        minifyURLs: shouldMinifyHtml
      }
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    new ExtractTextPlugin({
      filename: 'style.[chunkhash:8].css'
    }),
    // Copy files into build directory
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img/symbols/loader-spinner.svg',
        to: 'assets/img'
      }
    ])
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if we're not using Moment.js:
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
