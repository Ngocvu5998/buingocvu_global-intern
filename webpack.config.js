const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin').cleanWebpackPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if(process.env === "production") {
    mode = "production";
}
module.exports = {
    mode: mode,
    entry:[
        './asset/scss/main.scss',
		'./asset/js/main.js'
    ],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/main.bundle.js'
    },
    module: {
        rules: 
        [
            {
                test: /\.js%/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
				test: /\.(png|jpg)$/i,
				use: [
					'file-loader?name=[name].[ext]&outputPath=dist/imgs/&publicPath=../imgs/',
					'image-webpack-loader'
				]
			},
            {
				test: /\.(svg|woff|woff2|eot|otf|TTF)$/,
				use: [
					'file-loader?name=[name].[ext]&outputPath=fonts/&publicPath=../'
				]
			}
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname,"dist"),
        hot: true,
    },
    plugins: [
        
        new MiniCssExtractPlugin({filename:'css/style.bundle.css'}),
        
    ]
}