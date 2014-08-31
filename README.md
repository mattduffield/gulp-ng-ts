# gulp-ng-classify
> Convert TypeScript classes to [AngularJS](http://angularjs.org/) modules with [gulp-ng-ts](https://github.com/MattDuffield/gulp-ng-ts)  
> Write less JavaScript.  Write less TypeScript.  Write less Angular.
>
> Watch the [screencast](https://www.youtube.com/watch?v=28gUTu9vnB4)


## Install
Install with [npm](https://npmjs.org/package/gulp-ng-ts)
```bash
$ npm install gulp-ng-ts
```


## Usage


### JavaScript


```javascript
var gulp = require('gulp');
var ngTS = require('gulp-ng-ts');

gulp.task('default', function () {
	return gulp.src('**/*.ts')
		.pipe(ngTS())
		.pipe(gulp.dest('dist'));
});
```


## Table of Contents
* [Install](#install)
* [Usage](#usage)
	- [JavaScript](#javascript)
* [API](#api)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [License](#license)


## API
The following is the API for gulp-ng-ts


### ngTS(options)


#### options
*Optional*  
Type: `Object` or `Function` (see examples below)  
Default:  `undefined`  

Dynamically create options via the function callback.
The function takes in the file object and returns the options.

```javascript
var gulp = require('gulp');
var ngClassify = require('gulp-ng-classify');

gulp.task('default', function () {
	return gulp.src('**/*.coffee')
		.pipe(ngClassify(function (file) {
			// use 'admin' as the appName if 'administrator' is found in the file path

			if (file.path.indexOf('administrator') !== -1) {
				return {appName: 'admin'};
			}

			return {appName: 'app'};
		}))
		.pipe(gulp.dest('dist'));
});
```


## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)


## Changelog
See [CHANGELOG.md](CHANGELOG.md)


## License
See [LICENSE](LICENSE)

