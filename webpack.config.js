const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
dotenv.config();

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@fe-auth': path.resolve(__dirname, 'src/modules/fe-auth'),
      '@fe-files': path.resolve(__dirname, 'src/modules/fe-files'),
      '@fe-library': path.resolve(__dirname, 'src/modules/fe-library'),
      '@fe-web-pub-sub': path.resolve(__dirname, 'src/modules/fe-web-pub-sub'),
      '@fe-base': path.resolve(__dirname, 'src/modules/fe-base'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /test/],
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource', // Webpack 5
        generator: {
          filename: 'assets/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_APLICATION_UX_URL:JSON.stringify(process.env.BASE_APLICATION_UX_URL),
        CLIENT_ID:JSON.stringify(process.env.CLIENT_ID),
        TENANT_ID:JSON.stringify(process.env.TENANT_ID),
        REDIRECT_URI:JSON.stringify(process.env.REDIRECT_URI),
        OCP_APIM_SUBSCRIPTION_KEY:JSON.stringify(process.env.OCP_APIM_SUBSCRIPTION_KEY),
      },
    }),
  ],
  devServer: {
    host: 'localhost',
    port: process.env.PORT,
    historyApiFallback: true,
    open: true,
  },
};
