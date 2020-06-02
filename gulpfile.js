; 'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber-notifier');
const debug = require('gulp-debug');
const stripDebug = require('gulp-strip-debug');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const del = require('del');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const strip = require('gulp-strip-comments');
const isDevelopment = process.env.NODE_ENV != 'development';
const dir = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const path = require('path');
gulp.task('clearDist', function () {
	return del('./dist')
})



gulp.task('clean', function () {
	return del('./' + dir)
})

gulp.task('templates', function () {
	return gulp.src(['src/templates/**.pug', '!src/templates/mixins/version.pug'])
		.pipe(debug({ title: "templates" }))
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulpIf(isDevelopment, strip({
			safe: true
		})))
		.pipe(gulp.dest('./' + dir));
});

gulp.task('sass', function () {
	const plugins = [
		require('postcss-flexbugs-fixes'),
		autoprefixer(),
	]
	return gulp.src('src/styles/*.sass')
		.pipe(gulpIf(!isDevelopment,
			newer('./' + dir + '/styles/')
		))
		.pipe(debug({ title: "sass" }))
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(gulpIf(isDevelopment, cleanCSS()))
		.pipe(gulp.dest('./' + dir + '/styles/'))
});



const getFiles = (_path) => new Promise((resolve, reject) => {
	const fs = require('fs');

	let arr = {}

	fs.readdir(_path, function (err, items) {

		for (var i = 0; i < items.length; i++) {
			if (items[i].indexOf('.js') !== -1) {
				arr[items[i].split('.js')[0]] = _path + items[i]
			}
		}
		resolve(arr)
	});
})

gulp.task('scripts', function () {
	return getFiles('./src/scripts/').then(data => {
		return webpackStream({
				entry: data,
				mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							loader: 'babel-loader',
							query: {
								presets: ['@babel/preset-env']
							}
						}
					]
				},
				externals: {
					jquery: 'jQuery'
				},
				output: {
					filename: '[name].js',
				},
			}, webpack)
			.pipe(debug({ title: "scripts" }))
			.pipe(gulpIf(isDevelopment, stripDebug()))
			.pipe(gulp.dest('./' + dir + '/scripts'))
	})
});

gulp.task('images', function () {
	return gulp.src(['src/images/**', '!./src/images/sprite/**'], { since: gulp.lastRun('images') })
		.pipe(plumber())
		.pipe(debug({ title: 'images' }))
		.pipe(gulp.dest('./' + dir + '/images'))
});

gulp.task('fonts', function () {
	return gulp.src('src/fonts/**', { since: gulp.lastRun('fonts') })
		.pipe(plumber())
		.pipe(debug({ title: 'fonts' }))
		.pipe(gulp.dest('./' + dir + '/fonts'))
});

gulp.task('media', function () {
	return gulp.src('src/media/**', { since: gulp.lastRun('media') })
		.pipe(plumber())
		.pipe(debug({ title: 'media' }))
		.pipe(gulp.dest('./' + dir + '/media'))
});

gulp.task('libs', function () {
	return gulp.src('src/libs/**', { since: gulp.lastRun('libs') })
		.pipe(plumber())
		.pipe(debug({ title: 'libs' }))
		.pipe(gulp.dest('./' + dir + '/libs'))
});

gulp.task('watch', function () {
	gulp.watch('src/styles/**', gulp.series('sass'));
	gulp.watch('src/scripts/**', gulp.series('scripts'));
	gulp.watch('src/templates/**', gulp.series('templates'));
	gulp.watch('src/images/**', gulp.series('images'));
	gulp.watch('src/fonts/**', gulp.series('fonts'));
	gulp.watch('src/media/**', gulp.series('media'));
	gulp.watch('src/libs/**', gulp.series('libs'));
});

gulp.task('serve', function () {
	browserSync.init({
		server: '' + dir
	});

	browserSync.watch(dir + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'templates', 'scripts', 'images', 'fonts', 'media', 'libs')));

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);

gulp.task('production',
	gulp.series('build')
);
