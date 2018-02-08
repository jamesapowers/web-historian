var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
  
  if (req.method === 'GET') {
    // const inputValue = document.getElementById('inputbox').val();
    // console.log(inputValue)
    
    console.log(res.statusCode);
    archive.readListOfUrls( (data) => {
      res.statusCode = 200;
      let string = data.join(',');
      console.log(string);
      res.end(string); 
    });
  }

  if (req.method === 'POST') {
  
  }
};
