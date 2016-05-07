var express = require('express');
var cors = require('cors');
var app = express();

var user_id = 123;

app.get('/', cors(), function (req, res) {
  //res.send('Hello World!');
  res.sendfile('index.html');
});

app.get('/set_user_id', cors(), function (req, res) {
	user_id = req.query.user_id;
	console.log('user_id = ' + user_id);
	res.send();
});

app.get('/get_user_id', cors(), function (req, res) {
	console.log('user_id requested = ' + user_id);
	res.send(user_id);
});

app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});
