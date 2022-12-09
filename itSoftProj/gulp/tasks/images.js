import webp from 'gulp-webp';
import imagemin, {
	mozjpeg,
	gifsicle,
	optipng,
	svgo
} from 'gulp-imagemin';

export const images = () => {
	return app.gulp.src(
			app.path.src.img
		)
		.pipe(app.plugins.gulpPlumber(
			app.plugins.gulpNotify.onError({
				title: 'IMAGES',
				messange: "Error: <%= error.messamge %>"
			})
		))
		.pipe(app.plugins.changed(app.path.build.fonts))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.gulp.src(app.path.src.img))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(imagemin([
			gifsicle({
				interlaced: true
			}),
			mozjpeg({
				quality: 80,
				progressive: true
			}),
			optipng({
				optimizationLevel: 5
			}),
			svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: true
					}
				]
			})
		]))
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.gulp.src(app.path.src.ico))
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.plugins.browserSync.stream())
}