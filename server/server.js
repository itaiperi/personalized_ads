var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var PythonShell = require('python-shell');
var cors=require('cors');

var IMAGES_PATH="resources/images/";

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/ads', express.static('resources/images/personalized_ads'));


var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

//This responds a POST request for the homepage
app.get('/', cors(), function (req, res) {
    var user_id = req.query.user_id;
    var image_url = 'http://graph.facebook.com/' + user_id + '/picture?width=600&height=600';
    download(image_url, IMAGES_PATH + 'users/' + user_id + '.jpeg', function () {
        var ad_id=1;
        var options = {
            scriptPath: 'faceswapper/',
            args: ['../' + IMAGES_PATH + 'users/' + user_id + '.jpeg','../'+IMAGES_PATH + 'ads/' + ad_id + '.jpeg']
        };
        PythonShell.run('faceswapper.py',options, function (err) {
            if (err) {
                console.log(err);
                res.json({err: err});
            }
            res.end('http://' + req.get('host') + '/ads/' + user_id + '_' + ad_id + '.jpeg');
        });
    })
});

    var server = app.listen(8081, function () {
        console.log("Server started");
    });
