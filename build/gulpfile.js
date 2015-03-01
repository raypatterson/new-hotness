'use-strict';

var pkg = require('./package');
var cfg = require('./gulpfile.config');
var cms = require('./gulp/gulp-cms');
var _ = require('lodash');
var fs = require('fs-extra');
var del = require('del');
var path = require('path');
var open = require('open');
var cheerio = require('cheerio');
var minimist = require('minimist');
var vinyl = require('vinyl-paths');
// var lazypipe = require('lazypipe');
var favicons = require('favicons');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var bowerDirectory = JSON.parse(fs.readFileSync('./.bowerrc', 'utf-8')).directory;
var webpackConfig = Object.create(require('./webpack.config.js'));
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
	camelize: true
});

var knownOptions = {
	string: 'env',
	default: {
		env: process.env.NODE_ENV || 'development'
	}
};

var options = minimist(process.argv.slice(2), knownOptions);

var isCompiling = false;

var getOutputDir = function() {
	return isCompiling ? cfg.dir.dist : cfg.dir.temp
};

gulp.task('default', function() {
	runSequence('build', 'serve');
});

gulp.task('build', function(cb) {
	runSequence('del', 'bower', 'copy', ['webpack', 'sass'], ['ie8-index', 'ie8-lil'], cb);
});

gulp.task('ci', function(cb) {
	isCompiling = true;
	runSequence('del', 'bower', 'copy', ['webpack', 'sass'], ['ie8-index', 'ie8-lil'], 'rev', 'favicons', 'filemap', 'optimize', ['desktop-index', 'desktop-lil'], 'cleanup', cb);
});

gulp.task('del', function(cb) {
	del(getOutputDir(), cb);
});

gulp.task('cms', function(cb) {
	cms(cfg.cms, cb);
});

gulp.task('bower', function() {
	return gulp.src(mainBowerFiles(cfg.bower), {
			base: bowerDirectory
		})
		.pipe(gulp.dest(cfg.dir.app + '/vendor'));
});

gulp.task('desktop-index', function() {
	return gulp.src(getOutputDir() + '/lilsr.html')
		.pipe(rename('index.html'))
		.pipe(gulp.dest(getOutputDir() + '/desktop'))
		.pipe(gulp.dest(getOutputDir() + '/mobile'));
});

gulp.task('desktop-lil', function() {
	return gulp.src(
			[
				getOutputDir() + '/lib/lil.js'
			])
		.pipe(gulp.dest(getOutputDir() + '/desktop/lib'));
});

gulp.task('serve', function() {
	browserSync({
		notify: false,
		logPrefix: 'server',
		server: [cfg.dir.temp, 'app']
	});

	gulp.watch([
		'app/**/*.{html,json,js,jsx,scss}',
		'!**/vendor/**/*'
	], function(cb) {
		runSequence('webpack', ['ie8-index', 'ie8-lil'], browserSync.reload);
	});


	// ['webpack', ['ie8-index', 'ie8-lil'], browserSync.reload]);

	gulp.watch([
		'app/**/*.scss',
		'!**/vendor/**/*'
	], ['sass', browserSync.reload]);
});

gulp.task('webpack', function() {
	if (isCompiling) {
		webpackConfig.plugins = webpackConfig.plugins.concat(
			new webpack.DefinePlugin({
				'process.env': {
					// This has effect on the react lib size
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin()
		);
	}
	return gulp.src('app/**/*.{jsx}')
		.pipe($.webpack(webpackConfig, webpack))
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('ie8-index', function() {
	return gulp.src(
			[
				bowerDirectory + '/es5-shim/es5-shim.min.js',
				bowerDirectory + '/es5-shim/es5-sham.min.js',
				bowerDirectory + '/html5shiv/dist/html5shiv.min.js',
				getOutputDir() + '/lib/index.js'
			])
		.pipe($.concat('/lib/index.js'))
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('ie8-lil', function() {
	return gulp.src(
			[
				bowerDirectory + '/es5-shim/es5-shim.min.js',
				bowerDirectory + '/es5-shim/es5-sham.min.js',
				bowerDirectory + '/html5shiv/dist/html5shiv.min.js',
				getOutputDir() + '/lib/lil.js'
			])
		.pipe($.concat('/lib/lil.js'))
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('sass', function() {
	return gulp.src(
			[
				'**/*.scss',
				'!**/vendor/**/*',
				'!**/components/**/*'
			], {
				cwd: cfg.dir.app
			}
		)
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			includePaths: [
				cfg.dir.app,
				bowerDirectory
			],
			errLogToConsole: true
		}))
		.pipe($.autoprefixer({
			browsers: cfg.autoprefixer.BROWSERS
		}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('copy', function() {
	return gulp.src(
			[
				'**/*.{ico,png,jpg,gif,svg,eot,woff,ttf}'
			], {
				cwd: cfg.dir.app
			})
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('optimize', function() {

	var htmlFilter = $.filter(['**/*.html']);
	var cssFilter = $.filter(['**/*.css']);
	var jsonFilter = $.filter(['**/*.json']);
	var imageFilter = $.filter(['**/*.{png,jpg,gif,svg}']);

	return gulp.src(
			[
				'**/*.*',
				'!**/vendor/**/*'
			], {
				cwd: getOutputDir()
			})
		.pipe(htmlFilter)
		.pipe($.minifyHtml({
			comments: true,
			spare: true
		}))
		.pipe(htmlFilter.restore())
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore())
		.pipe(jsonFilter)
		.pipe($.jsonminify())
		.pipe(jsonFilter.restore())
		.pipe(imageFilter)
		.pipe($.imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{
				removeViewBox: false
			}]
		}))
		.pipe(imageFilter.restore())
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('rev', function() {
	return gulp.src(
			[
				'**/*.*',
				'!**/*.json',
				'!**/favicons/**/*',
				'!**/vendor/**/*',
				// '!**/**/index.*',
				'!**/**/lil.*'
			], {
				cwd: getOutputDir()
			})
		.pipe($.revAll({
			ignore: [
				/^\/index.html/g,
				/^\/lilsr.html/g,
				/^\/desktop\/index.html/g,
				/^\/mobile\/index.html/g,
				/^\/lib\/index.js/g,
				/^\/lib\/lil.js/g,
				/favicons/g,
				/vendor/g
			],
			// NOTE: Neither `prefix` prop or `transformPath` function affect output to manifest.
			// Currently prepending path with same value in `FileUtil.js`.
			prefix: cfg.cms.locales.assetPrefix,
			transformFilename: function(file, hash) {
				var ext = path.extname(file.path);
				var filename = hash.substr(0, 16) + '.production.' + path.basename(file.path, ext) + ext;
				return filename;
			}
		}))
		.pipe(gulp.dest(getOutputDir()))
		.pipe($.revAll.manifest({
			fileName: 'filemap.json'
		}))
		.pipe(gulp.dest(getOutputDir()));
});

gulp.task('favicons', function(cb) {

	favicons({
		source: 'assets/images/favicon.png',
		dest: getOutputDir() + '/favicons',
		android: true,
		apple: true,
		coast: true,
		favicons: true,
		firefox: true,
		opengraph: true,
		windows: true,
		background: '#ffffff',
		tileBlackWhite: false,
		manifest: null,
		trueColor: false,
		url: (options.env === 'production') ? cfg.url.production : cfg.url.development,
		logging: true,
		callback: function(response, html) {

			var filepath = getOutputDir() + '/lilsr.html';

			html = html.replace(new RegExp('href="' + getOutputDir() + '/', 'g'), 'href="' + cfg.cms.locales.assetPrefix);
			html = html.replace(new RegExp('content="' + getOutputDir() + '/', 'g'), 'content="' + cfg.cms.locales.assetPrefix);
			html = html.replace(new RegExp(getOutputDir() + '/', 'g'), '');

			var $ = cheerio.load(fs.readFileSync(filepath, 'utf-8'));

			$('head > title').before(html);

			fs.writeFileSync(filepath, $.html());

			cb();
		}
	});
});

gulp.task('filemap', function() {
	// TODO: This may not be necessary
	return gulp.src(
			[
				'lilsr.html'
			], {
				cwd: getOutputDir()
			})
		.pipe($.replaceTask({
			patterns: [{
				match: 'filemap',
				replacement: JSON.stringify(require('./' + getOutputDir() + '/filemap'))
			}]
		}))
		.pipe(gulp.dest(getOutputDir()));
});

// gulp.task('localize', function(cb) {

// 	var outputDir = getOutputDir();
// 	var src = outputDir + '/lilsr.html';
// 	var dir;
// 	var dest;

// 	_.each(cfg.cms.locales.list, function(locale) {

// 		dir = outputDir + '/' + locale.url;
// 		dest = dir + '/lilsr.html';

// 		fs.ensureDirSync(dir);
// 		fs.copySync(src, dest);
// 	});

// 	cb();
// });

gulp.task('cleanup', function() {
	return gulp.src(
			[
				'**/*.*',
				'!**/{content,preview}.json', // TODO: Remove once using live CMS data
				'!**/*.html',
				'!**/*.production.*.*',
				'!**/favicons/*.{png,ico}',
				'!**/vendor/**/*',
				'!**/**/index.*',
				'!**/**/lil.*'
			], {
				cwd: getOutputDir()
			})
		.pipe(vinyl(del));
});