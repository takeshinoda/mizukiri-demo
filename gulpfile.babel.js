import gulp    from 'gulp'
import gutil   from 'gulp-util'
import babel   from 'gulp-babel'
import zip     from 'gulp-zip'
import install from 'gulp-install'
import runSequence from 'run-sequence'
import awsLambda   from 'node-aws-lambda'
import aws         from 'aws-sdk'

const SOURCES    = ['src/**/*.js']

gulp.task('compile', () => {
  return gulp.src(SOURCES)
             .pipe(babel())
             .pipe(gulp.dest('dist'))
})

gulp.task('install', () => {
  return gulp.src('package.json')
             .pipe(gulp.dest('dist'))
             .pipe(install({ production: true }))
})

gulp.task('zip', () => {
  return gulp.src(['dist/**/*'])
             .pipe(zip('dist.zip'))
             .pipe(gulp.dest('./'))
})

gulp.task('upload', (done) => {
  awsLambda.deploy('./dist.zip', require('./config'), done)
})

gulp.task('deploy', done => runSequence('compile', 'install', 'zip', 'upload', done))

gulp.task('invoke', (done) => {
  const setting = require('./config')
  const lambda = new aws.Lambda({ region: setting.region })
  const params = {
    FunctionName: setting.functionName,
    InvocationType: 'Event',
    Payload: JSON.stringify({})
  }

  lambda.invoke(params, (err, data) => {
    if (err) {
      gutil.log(err, err.stack)
    }
    else {
      if (data.FunctionError) {
        gutil.log(`Failed invocation ${params.FunctionName}`)
        gutil.log(data.FunctionError)
      }
      else {
        gutil.log(`Success invocation ${params.FunctionName}`)
      }
      gutil.log('Result:')
      gutil.log(data.Payload)
    }
    done()
  })
})

gulp.task('default', done => runSequence('compile', 'deploy', done))

