const path = require('path');
 
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      { 
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
               name: '[name]-[hash:6].[ext]',
               outputPath: 'img'
            }
          }
        ]
      }
    ]
  }
}