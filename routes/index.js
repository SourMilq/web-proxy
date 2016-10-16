var express = require('express');
var request = require('request');

var router = express.Router();

var base_url = "http://f3a5a098.ngrok.io";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/v1/user', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;
  var url = base_url + path;

  var userName = formdata.username;
  var password = formdata.password;

  var data = {
    "username": userName,
    "password": password
  }

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    uri: url,
    body: JSON.stringify(data),
    method: 'POST'
  }, function (err, res2, body) {
    if(!err) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });

});


router.post('/v1/list/2', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;
  var url = base_url + path;

  var token = 'Bearer ' + formdata.token;

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization' : token
    },
    uri: url,
    method: 'GET'
  }, function (err, res2, body) {
    if(!err) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }

  });
});

router.post('/v1/user/create', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;
  var url = base_url + path;

  var data = {
    "first_name": formdata.first_name,
    "last_name": formdata.last_name,
    "email": formdata.email,
    "username": formdata.username,
    "password": formdata.password
  }

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    uri: url,
    body: JSON.stringify(data),
    method: 'POST'
  }, function (err, res2, body) {
    if(!err) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }

  });
});

router.get('/get', function(req, res, next) {
  res.render('index', { title: 'GET' });
});

module.exports = router;
