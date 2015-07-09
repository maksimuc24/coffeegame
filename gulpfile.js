var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // Load all gulp plugins
                                              // automatically and attach
                                              // them to the `plugins` object

var runSequence = require('run-sequence');    // Temporary solution until gulp 4
                                              // https://github.com/gulpjs/gulp/issues/355
var template = require('lodash').template;

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

var watch = require('gulp-watch');

var concat = require('gulp-concat');

var livereload = require('gulp-livereload');

var uglify = require('gulp-uglify');
// -----------------------------------------------------------------------------
// | Helper tasks                                                              |
// -----------------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath)
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean', function (done) {
    require('del')([
        template('<%= archive %>', dirs),
        template('<%= dist %>', dirs)
         
    ], done);
}); 



gulp.task('copy', [
    'copy:.htaccess',
    'copy:index.html',
    'copy:jquery',
    'copy:main.css',
    'copy:misc',
    'copy:normalize'
]);

gulp.task('copy:production-index.html', function () {
    return gulp.src(template('<%= src %>/index.html', dirs))
               .pipe(plugins.replace(/main-src.js/g, 'production/main-src.js'))
               .pipe(gulp.dest(template('<%= dist %>', dirs)));
});


gulp.task('copy:.htaccess', function () {
    return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
               .pipe(plugins.replace(/# ErrorDocument/g, 'ErrorDocument'))
               .pipe(gulp.dest(template('<%= dist %>', dirs)));
});

gulp.task('copy:index.html', function () {
    return gulp.src(template('<%= src %>/index.html', dirs))
               .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.devDependencies.jquery))
               .pipe(gulp.dest(template('<%= dist %>', dirs)));
});

gulp.task('copy:jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
               .pipe(plugins.rename('jquery-' + pkg.devDependencies.jquery + '.min.js'))
               .pipe(gulp.dest(template('<%= dist %>/js/vendor', dirs)));
});

gulp.task('copy:main.css', function () {

    var banner = '/*! HTML5 Boilerplate v' + pkg.version +
                    ' | ' + pkg.license.type + ' License' +
                    ' | ' + pkg.homepage + ' */\n\n';

    return gulp.src(template('<%= src %>/css/main.css', dirs))
               .pipe(plugins.header(banner))
               .pipe(gulp.dest(template('<%= dist %>/css', dirs)));

});

gulp.task('copy:misc', function () {
    livereload.listen();
    return gulp.src([

        // Copy all files
        template('<%= src %>/**/*', dirs),

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        template('!<%= src %>/css/main.css', dirs),
        template('!<%= src %>/index.html', dirs),
        template('!<%= src %>/js/*.js', dirs),
        template('!<%= src %>/app/**/*.js', dirs)

    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(template('<%= dist %>', dirs)));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(template('<%= dist %>/css', dirs)));
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static('dist'));
  app.listen(4000);
});

gulp.task('livereload', function() {
  var tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

gulp.task('scripts', function(){
  return gulp.src([
              'src/js/app.js',
              'src/js/route.js',
              'src/js/!(app|route)*.js',
              'src/app/**/*.js'
            ])
            .pipe(concat('main-src.js'))
            .pipe(gulp.dest(template('<%= dist %>/js', dirs)))
            .pipe(livereload());
});
/**
* Working wathc script
**/
gulp.task('scripts-watch', function(){
  gulp.watch([
              'src/js/*.js',
              'src/app/**/*.js',
              'src/**/**/**/*.html',
              'src/css/*.css',
            ], ['scripts',
                'copy:index.html',
                'copy:main.css',
                'copy:misc']);
});
/**
* Js uglify
*/
gulp.task('compress', function() {
  return gulp.src('server/dist/js/main-src.js')
    .pipe(uglify())
   .pipe(gulp.dest('server/dist/js/production/')); 

});

/**
* Watch task with livereload
*/
gulp.task('watch',['watch:js',
                   'watch:css',
                   'watch:html']  
);

gulp.task('watch:js', function() {
  livereload.listen();
  gulp.watch('src/**/**/**/**/**/**/**/*.js', ['scripts']);
});

gulp.task('watch:css', function() {
  livereload.listen();
  gulp.watch('src/css/*.css', ['copy:main.css']);
});

gulp.task('watch:html', function() {
  livereload.listen();
  gulp.watch('src/**/**/**/*.html', ['copy:misc','copy:index.html']);
});


// -----------------------------------------------------------------------------
// | Main tasks                                                                |
// -----------------------------------------------------------------------------

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

/**
* Build for dev brach
*/
gulp.task('build', function (done) {
    runSequence(
        ['clean'],
        'copy', 'scripts',
    done);
});

/**
* Build for production brach
*/
gulp.task('build-production', function (done) {
    runSequence(
        ['clean'],
        'copy', 
        'scripts',
        'compress',
        'copy:production-index.html',
    done);
});



gulp.task('server', function (done) {
    runSequence(
        'clean', ['copy', 'scripts', 'express','watch'],
    done);
});

gulp.task('default', ['build']);
