var fs = require('fs');
var path = require('path');
var helper = require('../web/http-helpers.js');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return fs.readFile(this.paths.list, 'utf8', function(err, data) {
    if (err) {
      throw (err);
    }
    var arr = data.toString().split('\n');
    return callback(arr);
  });
};

exports.isUrlInList = function(url, callback) {
  return exports.readListOfUrls(function(data) {
    return callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, 'utf8', function(err) {
    if (err) {
      throw err;
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  exports.isUrlInList(uri, function(found) {
    fs.exists(exports.archiveFilePath(helper.urlhost(uri)), function(exists){
      callback(uri,exists);
    });
  });
};

exports.downloadUrls = function(urls) {
  _.each(urls, function(uri){
    exports.isUrlArchived(uri, function(uri,exists){
      if (!exists) {
        uri = 'http://' + uri;
        request(uri, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            fs.writeFile(exports.archiveFilePath(helper.urlhost(uri)),body, callback);
          }
        })
      }
    })
  });
};
