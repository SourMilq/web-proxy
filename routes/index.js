var express = require('express');

var router = express.Router();

var request = require('request');

var base_url = "http://f3a5a098.ngrok.io/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/v1/user/create', function(req, res, next) {
  var formdata = req.body;

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    uri: base_url + '/v1/user/create',
    body: formdata,
    method: 'POST'
  }, function (err, res, body) {
    if(!err) {
      res.send(body.getData());
    }
    else {
      console.log("Test");
    }

  });

  res.render('index', { title: 'Express' });
});

router.get('/get', function(req, res, next) {
  res.render('index', { title: 'GET' });
});

module.exports = router;
