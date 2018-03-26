const path = require('path');

const common = {
  context: path.join(__dirname, '/client/src/components'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const client = {
  entry: path.join(__dirname, '/client/src/clientView.js'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /dayPicker\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.css$/,
        exclude: /dayPicker\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ]
  },
  output: {
    filename: 'res-bundle.js',
    path: path.join(__dirname, '/client/dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const server = {
  entry: path.join(__dirname, '/client/src/serverView.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'res-bundle-server.js',
    libraryTarget: 'commonjs-module',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /dayPicker\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /dayPicker\.css$/,
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];