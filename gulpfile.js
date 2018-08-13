const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence');
const eslint = require('gulp-eslint');
gulp.task('builddev', () => {
	return watch('./src/nodeui/**/*.js', {
			ignoreInitial: false
		},
		() =>{
		gulp.src('./src/nodeui/**/*.js')
		.pipe(babel({
			//关闭外侧的.babelrc
			babelrc: false,
			'plugins': ['transform-es2015-modules-commonjs','transform-decorators-legacy']
		}))
		.pipe(gulp.dest('dist'))
	})
});

gulp.task('buildprod', () => {
		gulp.src('./src/nodeui/**/*.js')
		.pipe(babel({
			//关闭外侧的.babelrc
			babelrc: false,
			ignore:['./src/nodeui/config/*.js'],
			'plugins': ['transform-es2015-modules-commonjs','transform-decorators-legacy']
		}))
		.pipe(gulp.dest('dist'))
});

gulp.task('configclean', function() {
  gulp.src('./src/nodeui/**/*.js')
    .pipe(rollup({
      output:{
    	 format:'cjs'
      },
      input: './src/nodeui/config/index.js',
      plugins: [
          replace({
              'process.env.NODE_ENV': JSON.stringify('production')
             })
          ]
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('lint', () => {
		 gulp.src('./src/nodeui/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
let _task = ['builddev'];
if (process.env.NODE_ENV === 'production') {
	_task = gulpSequence(['lint','buildprod','configclean']);//先检查代码书写规范，buildpro，清洗配置环境
}
if (process.env.NODE_ENV === 'lint') {
	_task = ['lint'];
}
gulp.task('default', _task);





