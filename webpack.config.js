const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const PORT=process.env.PORT||5000;
const HOST='localhost'||'0.0.0.0';


module.exports = {
    entry:{
        main:"./src/index.js"
    },
    output:{
        filename:"[name].[hash].bundle.js"
    },
    devServer:{
        disableHostCheck:true,
        contentBase:"./dist",
        compress:true,
        inline:true,
        port:PORT,
        host:HOST,
    },   
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[hash].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.(js|jxs)$/,
            exclude: /node_modules/,
            use: { loader: "babel-loader" }
        },
          { test:/\.scss$/,
            use:[MiniCssExtractPlugin.loader,"css-loader","sass-loader"]}
        ]
    }
}