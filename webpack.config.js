const webpack = require('webpack') //to access built-in plugins
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm

module.exports = {
	entry: './public/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'json', 'png'],
	},
	mode: 'development',
	module: {
		rules: [
			{ test: /\.ts$/, use: 'ts-loader' },
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
}
