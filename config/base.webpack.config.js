const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

const resolve = path.resolve.bind(this, __dirname, '..')

const sassResourcesLoader = {
	loader: 'sass-resources-loader',
	options: {
		resources: [
			resolve('src/assets/sass/variables.sass')
		]
	}
}

module.exports = ({ dev }) => ({
	entry: {
		main: resolve('src/index.js')
	},
	output: {
		path: resolve('build'),
		filename: dev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
		chunkFilename: dev ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].js',
		publicPath: '/'
	},
	module: {
		rules: [
			// Javascript
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
						],
						plugins: [
							'@babel/plugin-transform-runtime',
							['@babel/plugin-proposal-class-properties', { loose: true }],
							'react-hot-loader/babel'
						]
					}
				}
			},
			// Styles global
			{
				test: /\.(sass|scss)$/,
				exclude: resolve('src/components'),
				use: [
					ExtractCssChunksPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: dev
						}
					},
					'sass-loader',
					sassResourcesLoader
				]
			},
			// Styles Modules
			{
				test: /\.(sass|scss)$/,
				include: resolve('src/components'),
				use: [
					ExtractCssChunksPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: dev,
							modules: true,
							camelCase: true,
							localIdentName: dev ? '[local]__[hash:base64:5]' : '[hash:base64]'
						}
					},
					'sass-loader',
					sassResourcesLoader
				]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('src/index.html')
		}),
		new ExtractCssChunksPlugin({
			filename: dev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
			chunkFilename: dev ? 'css/[name].chunk.css' : 'css/[name].[contenthash:8].css',
			orderWarning: false
		})
	],
	resolve: {
		plugins: [
			new DirectoryNamedPlugin({
				honorIndex: true,
				exclude: /node_modules/
			})
		],
		alias: {
			'@': resolve('src')
		}
	}
})