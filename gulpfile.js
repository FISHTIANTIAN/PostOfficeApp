const gulp = require('gulp'),
    babel = require("gulp-babel"),    // 用于ES6转化ES5
    uglify = require('gulp-uglify'), // 用于压缩 JS
    changed = require('gulp-changed'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    concat = require('gulp-concat'),   //合并文件
    rename = require('gulp-rename'),   //文件重命名
    cache = require('gulp-cache'), //图片缓存
    errors = require('gulp-util'),
    plumber = require('gulp-plumber');

const less = require('gulp-less'),
	cssmin = require('gulp-clean-css'), // 用于压缩 CSS
	px2rem = require('gulp-px2rem-plugin'),
	px2rem_opts = {
		width_design: 640,	// 设计稿宽度。默认值640
		pieces: 8,	// 将整屏切份（1920/80=24）。默认为10，相当于10rem = width_design(设计稿宽度)
		valid_num: 8,	// 生成rem后的小数位数。默认值4
		ignore_px: [],	// 让部分px不在转换成rem。默认为空数组
		ignore_selector: []	// 让部分选择器不在转换为rem。默认为空数组
	},
	autoprefixer = require('gulp-autoprefixer'),
	autoprefixer_opts = {
		// browsers: ['last 2 versions', 'Android >= 4.1'],
		overrideBrowserslist: ['last 2 versions', 'Android >= 4.1'],
		cascade: true, //是否美化属性值 默认：true 像这样：
		//-webkit-transform: rotate(45deg);
		//        transform: rotate(45deg);
		remove: true //是否去掉不必要的前缀 默认：true
	};

const js_src = [
	'js/dwz/template-web.js',
	'js/dwz/dwz.core.js',
	'js/dwz/dwz.util.date.js',
	'js/dwz/dwz.touchWipe.js',
	'js/dwz/dwz.touchWobble.js',
	'js/dwz/dwz.effect.js',
	'js/dwz/dwz.ajax.js',
	'js/dwz/dwz.alert.js',
	'js/dwz/dwz.astra.js',
	'js/dwz/dwz.scroll.js',
	'js/dwz/dwz.list.js',
	'js/dwz/dwz.navView.js',
	'js/dwz/dwz.dialog.js',
	'js/dwz/dwz.touchSlide.js',
	'js/dwz/dwz.dropPanel.js',
	'js/dwz/dwz.popPanel.js',
	'js/dwz/dwz.dropdown.js',
	'js/dwz/dwz.lottery.js',
	'js/dwz/dwz.media.js',
	'js/dwz/dwz.history.js',
	'js/dwz/dwz.lottery.js',
	'js/dwz/dwz.loading.js',
	'js/dwz/dwz.media.js',
	'js/dwz/dwz.tabs.js',
	'js/dwz/dwz.navTab.js',
	'js/dwz/dwz.navView.js',
	'js/dwz/dwz.scroll.js',
	'js/dwz/dwz.ui.js',
	'js/dwz/dwz.slideTab.js',
	'js/biz.common.js',
	'js/biz.conf.js',
	'js/biz.school.js',
	'js/biz.user.js',
	'js/biz.websocket.js'
];

/* less */
gulp.task('less-dev', () => {
	return gulp.src(['less/ui.less']) //多个文件以数组形式传入
		.pipe(changed('css', {
			hasChanged: changed.compareSha1Digest
		}))
		// .pipe(plumber())
		.pipe(less({dumpLineNumbers: "comments", env: 'development', relativeUrls: true}))
		.pipe(px2rem(px2rem_opts))
		.pipe(autoprefixer(autoprefixer_opts))
		.on('error', function (err) {
			errors.log(errors.colors.red('[Error]'), err.toString());
		})
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

/* serve */
gulp.task('serve-dev', () => {
	browserSync.init({
		port: 2019,
		server: {
			baseDir: ['./'],
			index: "index.html"
		}
	});
	gulp.watch('less/**/*', gulp.series('less-dev'));
});

/* dev */
gulp.task('dev', gulp.series(
    'less-dev',
    'serve-dev')
);

