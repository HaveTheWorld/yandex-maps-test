const merge = require('webpack-merge')
const baseConfig = require('./base.webpack.config')

module.exports = merge(baseConfig({ dev: true }), {
	mode: 'development',
	devtool: 'inline-sourcemap'
})