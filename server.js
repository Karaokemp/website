const MONGODB_URI = 'mongodb://heroku_7dxj62wx:aae26f0tfj13dm8481oontmtth@ds247479.mlab.com:47479/heroku_7dxj62wx';

const express = require('express');
const app = express(),
      monq = require('monq'),
      client = monq(MONGODB_URI);

      var queue = client.queue('example');

      
const backend = require('./file-server/files.service');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

app.listen(process.env.PORT || 80);


app.post('/youtube', function(req, res, next) {

  queue.enqueue('reverse', { text: 'bulbul' }, function (err, job) {
    console.log('enqueued:', job.data);
  });
  console.log("see in queue?");
});

app.get('/start',function(req,res,next){
  var worker = client.worker(['example']);

  
  
 worker.register({
     reverse: function (params, callback) {
         try {
             var reversed = params.text.split('').reverse().join('');
             callback(null, reversed);
         } catch (err) {
             callback(err);
         }
     }
 });

 worker.on('dequeued', function (data) {console.log('dequeued'); });
 worker.on('failed', function (data) {console.log('failed') });
 worker.on('complete', function (data) { console.log('complete'); });
 worker.on('error', function (err) {console.log('error') });
  
 worker.start();

 console.log("see processings?");

});
