const merge = require('webpack-merge')
const baseConfig = require('./base.webpack.config')

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-sourcemap',
	devServer: {
		historyApiFallback: true
	}
})