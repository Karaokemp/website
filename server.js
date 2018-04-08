const express = require('express');
const app = express();
const backend = require('./file-server/files.service');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

app.get('/youtube', function(req, res){
  console.log('got request!');
  let link = req.param('link');
  backend.upload(link);
  let message = 'uploading link: ' +link;
  console.log(message);
    res.send(message);
  });