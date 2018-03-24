const path = require('path');

const client = {
  entry: './client/src/clientView.js',
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

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/'
  }
};

const server = {
  context: path.resolve(__dirname, 'client'),
  entry: path.resolve(__dirname, 'client/src/serverView.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle-server.js',
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
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.css$/,
        exclude: /dayPicker\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = [
  client, server,
];