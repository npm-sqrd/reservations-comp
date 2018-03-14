const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/src/production.js',

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

  plugins: [
    new Dotenv()
  ],

  output: {
    filename: 'bundle-prod.js',
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/'
  }
};