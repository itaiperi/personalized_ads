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

var choose_ad = function (user_id, gender) {
    // if (gender == "male") {
    //     return 'ad_17';
    // } else {
    //     return 'ad_17';
    // }
    if (user_id == '10209785803346900') {
        return 'ad_17';
    } else if (user_id == '10208081116158500') {
        return 'ad_18';
    } else {
        return 'ad_generic';
    }
}

var swap = function(user_path, ad_path) {
    var options = {
        scriptPath: 'faceswapper/',
        args: [user_path, ad_path]
    };
    PythonShell.run('faceswapper.py',options, function (err) {
        if (err) {
            console.log(err);
            ad_response(err);
        } else {
            ad_response();
        }
    });
}

var user_id = 123;

app.get('/set_user_id', cors(), function (req, res) {
    user_id = req.query.user_id;
    console.log('user_id = ' + user_id);
    res.send();
});

app.get('/get_user_id', cors(), function (req, res) {
    console.log('user_id requested = ' + user_id);
    res.send(user_id);
});

app.get('/login', cors(), function (req, res) {
  res.sendfile('login.html');
});

//This responds a GET request for the homepage
app.get('/get_ad', cors(), function (req, res) {
    console.log(new Date(), 'got request');
    ad_response = function ad_response(err) {
        if (err) {
            console.log(err);
            res.json({err: err});
        } else {
            res.send('http://' + req.get('host') + '/ads/' + user_id + '_' + ad_id + '.jpg');
        }
    }

    var user_id = req.query.user_id;
    var gender = req.query.gender;
    if (!user_id) {
        res.json({err: 'No user id passed'});
        return;
    }
    // console.log("TEST");
    var ad_id = choose_ad(user_id, gender);
    if (!fs.existsSync('./resources/images/users/' + user_id + '.jpg')) {
        var image_url = 'http://graph.facebook.com/' + user_id + '/picture?width=600&height=600';
        download(image_url, IMAGES_PATH + 'users/' + user_id + '.jpg', function (err) {
            if (err) {
                // TODO handle download error
            }
            swap('../resources/images/users/' + user_id + '.jpg', '../resources/images/ads/' + ad_id + '.jpg');
        });
    } else if (!fs.existsSync('./resources/images/personalized_ads/' + user_id + '_' + ad_id + '.jpg')) {
        swap('../resources/images/users/' + user_id + '.jpg', '../resources/images/ads/' + ad_id + '.jpg');
    } else {
        ad_response();
    }

});


var server = app.listen(8081, function () {
    console.log("Server started");
});
