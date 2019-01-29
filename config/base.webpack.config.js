const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const DirectoryNamedPlugin = require('directory-named-webpack-plugin')

const resolve = path.resolve.bind(this, __dirname, '..')

const resourcesLoader = {
	loader: 'sass-resources-loader',
	options: {
		resources: [
			resolve('src/assets/sass/variables.sass')
		]
	}
}

module.exports = {
	entry: resolve('src/index.js'),
	output: {
		path: resolve('build'),
		filename: 'js/bundle.js',
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
							sourceMap: true
						}
					},
					'sass-loader',
					resourcesLoader
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
							sourceMap: true,
							modules: true,
							camelCase: true,
							localIdentName: '[local]__[hash:base64:5]'
						}
					},
					'sass-loader',
					resourcesLoader
				]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('src/index.html')
		}),
		new ExtractCssChunksPlugin({
			filename: 'css/[name].css',
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
}