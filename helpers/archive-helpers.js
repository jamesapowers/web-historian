var fs = require('fs');
var path = require('path');
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
  // fs.readFile(this.path.archivedSites, 'utf8', function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(data);
  // });

  // var archivedSites = this.paths.archivedSites;
  // for (var i = 0; i < archivedSites.length; i++) {
  //   if (callback(archivedSites[i]).url === url) {
  //     return true;
  //   }
  // }
  // return false;
};

exports.downloadUrls = function(urls) {
  // for (var i = 0; i < urls.length; i++) {
  //   if (this.isUrlArchived(urls[i], function (url) {
  //     JSON.parse(url);
  //   })) {
  //     return urls[i];
  //   }
  // }
};
