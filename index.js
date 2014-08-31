var through = require('through2'),
    gutil = require('gulp-util'),
    _ = require('lodash'),
    PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'gulp-ng';

// plugin to add Angular registrations in TypeScript files.
function gulpNg() {

  var config = {
    className: '',
    typeName: '',
    params: []
  };


  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-ng-transform',  'Streaming not supported'));
    }

    if (file.isBuffer()) {
      var contents = file.contents.toString();
      // Get the class name.
      var className = /export class (.*) (?=extends)/.exec(contents);
      if (className) {
        config.className = className[1];
      }
      else {
        className = /export class (.*) (?=implements)/.exec(contents);
        if (className) {
          config.className = className[1];
        }
      }
      // console.log(config.className);
      // Get the type of class, e.g. Controller, Service, Directive
      var typeName = /implements I(.*)/.exec(contents);
      if (typeName) {
        config.typeName = typeName[1];
        // console.log(config.typeName);        
      }
      // The following handles the contructor parameters.
      var params = /constructor\([^.]*\)/m.exec(contents);
      var paramsArray = params[0].split('\n');
      _.each(paramsArray, function (line) {
        if (line.indexOf('constructor(') < 0 && line.indexOf(')') < 0) {
          if (line.indexOf(':') > 0) {
            var sub = line.substring(line.indexOf(':'));
            line = line.replace(sub, '');
          }
          var entry = line
            .replace('public', '')
            .replace('private', '')
            .replace(',', '')
            // .replace(':any', '')
            // .replace(': any', '')
            .trim();
          config.params.push(entry);
        }
      });
      // console.log(params[0]);


      // Create the register entry.
      var register = "\n\napp.register" + config.typeName + "('" + config.className + 
        "', ['" + config.params.join('\', \'') + "']);";
      var newContentString = contents + register;

      //  change the file contents
      file.contents = new Buffer(newContentString);      
    }   


    // make sure the file goes through the next gulp plugin
    this.push(file);
    // tell the stream engine that we are done with this file
    return cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = gulpNg;