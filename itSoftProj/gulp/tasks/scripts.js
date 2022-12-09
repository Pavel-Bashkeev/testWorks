import webpackStream from "webpack-stream"
import TerserPlugin from "terser-webpack-plugin";
export const scripts = () => {
	return app.gulp.src(
		app.path.src.js, {
		sourcemaps: true
	}
	)
		.pipe(app.plugins.gulpPlumber(
			app.plugins.gulpNotify.onError({
				title: 'JS',
				messange: "Error: <%= error.messamge %>"
			})
		))
		.pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourceMaps.init({
			loadMaps: true
		})))
		.pipe(webpackStream({
			mode: app.isBuild ? 'production' : 'development',
			// devtool: dev ? 'eval-source-map' : false,
			entry: ['@babel/polyfill', app.path.src.js],
			output: {
				filename: '[name].min.js'
			},
			performance: {
				hints: false,
				maxEntrypointSize: 512000,
				maxAssetSize: 512000
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /^_(\w+)(\.js)$|node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					},
				]
			},
			optimization: {
				splitChunks: {
					chunks: 'all',
					maxInitialRequests: Infinity,
					minSize: 0,
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name: "vendor"
						},
					},
				},
				minimize: app.isBuild,
				minimizer: [
					new TerserPlugin({
						test: /\.js(\?.*)?$/i,
						parallel: true,
						terserOptions: {
							mangle: true,
							sourceMap: !app.isBuild,
							output: {
								comments: false,
							},
						},
					})
				],
			}
		}))
		.pipe(app.plugins.gulpIf(app.isDev, app.plugins.sourceMaps.write()))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browserSync.stream())
}
export const externalScripts = () => (
	app.gulp.src(app.path.src.exJs)
		.pipe(app.gulp.dest(app.path.build.js))
)