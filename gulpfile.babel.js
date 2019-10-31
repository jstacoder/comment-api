import gulp from 'gulp'
import fs from 'fs'
import browserify from 'gulpify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import explicitWindow from 'gulp-explicit-window'
import streamify from 'gulp-streamify'
import buffer from 'gulp-buffer'
import Window from 'window'
import babel from 'gulp-babel'

var window = new Window

const testGulp = cb =>{
    return gulp.src('./*.es6')
        .on('data', file=>{
            console.log(`read ${file.contents.length} bytes of data`)
        })
}

gulp.task('test:gulp', testGulp)

const doIt = cb =>{
    return browserify({noBrowserField: true, noBundleExternal: true, entries: ['index.es6']})

    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    // .pipe(streamify(explicitWindow()))
    .pipe(buffer())    
    .pipe(gulp.dest('dist/'))
}




const build = cb =>{
    gulp.src('index.es6')
        .pipe(
            browserify('index.bundle.js', {entry: 'index.es6', noBrowserField: true, noBundleExternal: true})
            .transform(babelify)
            
        ).on('error',  console.log)
        .pipe(gulp.dest('./dist/'))
    // const bundler = 
    // bundler
    // bundler.on('error', console.log)
    // bundler.on('file', file=>{
    //     console.log(`processed: ${file}`)
    // })
    // bundler.on('bundle', ()=>{
    //     console.log('started build')
    // })
    // bundler.on('end', ()=>{
    //     console.log('build complete')
    // })
    
    cb()
}

gulp.task('build', doIt)

const buf = (...files) =>{
    console.log('ARGS: ', files)
    files.forEach(file=>{
        console.log(file.path)
        console.log(file.basename)
        console.log(file.isBuffer())
        console.log(file.isStream())
        console.log(file.contents.toString())        
    })
    return 'ahhhh'
}

const test = cb =>{
    cb()
    console.log('good')
}

gulp.task('test', test)

const copy = cb =>
    gulp.src('./index.js', {read: true, buffer: true})
        // .on('data', buf)
        .pipe(babel())
        .pipe(browserify({}))
        .pipe(gulp.dest('dist/'))

gulp.task('copy', copy)