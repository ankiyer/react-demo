var webpack = require('webpack');
module.exports={
  entry:'./src/js/index.js',
  output:{
    path:__dirname+'/static/',
    publicPath:'./static/',
    filename:'index.js'
  },
  module:{
    loaders:[
      {
        test:/.js$/,loader:'babel-loader',
        exclude:/node_modules/,query:{
        presets:['react','es2015']
        }
      },
      {
        test:/.css$/,loader:'style-loader!css-loader'
      },
      {
        test:/.less$/,loader:'style-loader!css-loader!less-loader'
      },
      {
        test:/(.png|.jpg)$/,loader:"url-loader?limit=8192&name=img/[name].[ext]"
      }
    ]
  }
}
