import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

// This configuration can be confusing so I've moved it to a separate file

const shouldEnableSourceMaps = true;

const postCssConfig = () => {
  return {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    sourceMap: shouldEnableSourceMaps,
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['last 2 versions', 'not ie < 10'],
        flexbox: 'no-2009'
      })
    ]
  };
};

export const devStyleLoader = [
  require.resolve('style-loader'),
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      sourceMap: shouldEnableSourceMaps,
      localIdentName: '[name]__[local]-[hash:base64:5]'
    }
  },
  {
    loader: require.resolve('resolve-url-loader'),
    options: {
      sourceMap: shouldEnableSourceMaps
    }
  },
  {
    loader: require.resolve('postcss-loader'),
    options: postCssConfig()
  },
  {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: shouldEnableSourceMaps
    }
  }
];

export const prodStyleLoader = ExtractTextPlugin.extract(
  Object.assign({
    fallback: require.resolve('style-loader'),
    use: [
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]-[hash:base64:5]',
          minimize: true
        }
      },
      {
        loader: require.resolve('resolve-url-loader')
      },
      {
        loader: require.resolve('postcss-loader'),
        options: postCssConfig()
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          outputStyle: 'compressed'
        }
      }
    ]
  })
);
