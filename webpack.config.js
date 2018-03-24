const path = require('path');

const common = {
  context: path.join(__dirname, '/client/src/components'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const client = {
  entry: path.join(__dirname, '/client/src/serverView.js'),
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
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/dist')
  }
};

const server = {
  entry: path.join(__dirname, '/client/src/clientView.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, '/client/dist'),
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
  }
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];

// const path = require('path');

// module.exports = {
//   entry: './client/src/index.jsx',


//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['env', 'react']
//           }
//         }
//       },
//       {
//         test: /dayPicker\.css$/,
//         use: [ 'style-loader', 'css-loader' ],
//       },
//       {
//         test: /\.css$/,
//         exclude: /dayPicker\.css$/,
//         loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
//       },
//     ]
//   },

//   resolve: {
//     extensions: ['.js', '.jsx']
//   },

//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'client/dist'),
//     publicPath: '/'
//   }
// }