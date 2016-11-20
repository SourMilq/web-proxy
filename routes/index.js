var express = require('express');
var request = require('request');

var router = express.Router();

var base_url = "http://ec2-35-163-95-143.us-west-2.compute.amazonaws.com:3000";

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
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);
    }
    else {
      console.log("Failed");
      console.log(err);
      res.status(500).send(err);
    }
  });
});

router.post('/v1/recipe/suggest', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;
  var paramString = "?q=" + formdata.percentage;
  var url = base_url + path + paramString;

  var token = 'Bearer ' + formdata.token;

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization' : token
    },
    uri: url,
    method: 'GET'
  }, function (err, res2, body) {
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).recipes;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/recipe', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;
  var offsetString = "?limit=10&offset=" + formdata.offset;
  var url = base_url + path + offsetString;

  var token = 'Bearer ' + formdata.token;

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization' : token
    },
    uri: url,
    method: 'GET'
  }, function (err, res2, body) {
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).recipes;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/lists', function(req, res, next) {
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
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var json = JSON.parse(body);
      var lists = json.lists;
      var id = -1;

      res.end(JSON.stringify(lists));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }

  });
});

router.post('/v1/list/:id/item/:itemid/done', function(req, res, next) {
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
    method: 'POST'
  }, function (err, res2, body) {
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).list.items;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/list/:id/item/:itemid/update', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;

  var url = base_url + path;

  var token = 'Bearer ' + formdata.token;
  var expiration = formdata.expiration;

  var data = {
    'expiration' : expiration
  }

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization' : token
    },
    body: JSON.stringify(data),
    uri: url,
    method: 'POST'
  }, function (err, res2, body) {
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).list.items;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/recipe/:id/add', function(req, res, next) {
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
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end();
      //var items = JSON.parse(body).list.items;
      //res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/list/:id/item/add', function(req, res, next) {
  var formdata = req.body;
  var path = req.originalUrl;

  var url = base_url + path;

  var token = 'Bearer ' + formdata.token;

  var itemName = formdata.name;
  var itemPrice = formdata.price;
  var itemQuantity = formdata.quantity;
  var itemExpiration = formdata.expiration;

  var data = {
    "listId": req.params.id,
    "item":{
      "name": itemName,
      "quantity": itemPrice,
      "price": itemQuantity,
      "expiration" : itemExpiration
    }
  };

  request({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization' : token
    },
    body: JSON.stringify(data),
    uri: url,
    method: 'POST'
  }, function (err, res2, body) {
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).list.items;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/list/:listid/item/:itemid', function(req, res, next) {
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
    method: 'DELETE'
  }, function (err, res2, body) {
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).list.items;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      res.status(500).send(err);
    }
  });
});

router.post('/v1/list/:id', function(req, res, next) {
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
    if(!err && res2.statusCode == 200 ) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var items = JSON.parse(body).list.items;
      res.end(JSON.stringify(items));
    }
    else {
      console.log("Failed");
      console.log(err);
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
    if(!err && res2.statusCode == 200) {
      console.log("Success");
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);
    }
    else {
      console.log("Failed");
      console.log(err);
      res.status(500).send(err);
    }

  });
});

router.get('/get', function(req, res, next) {
  res.render('index', { title: 'GET' });
});

module.exports = router;
