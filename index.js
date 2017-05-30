var express = require('express');
var app = express();

var rootPage;
fs = require('fs')
fs.readFile('./index.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  rootPage = data;
  //console.log(data);
});

// mongodb 
/*
var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

  // Open the connection to the server
  mongoclient.open(function(err, mongoclient) {

    // Get the first db and do an update document on it
    var db = mongoclient.db("integration_tests");
    db.collection('mongoclient_test').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
      assert.equal(null, err);
      assert.equal(1, result);

      // Get another db and do an update document on it
      var db2 = mongoclient.db("integration_tests2");
      db2.collection('mongoclient_test').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result);

        // Close the connection
        mongoclient.close();
      });
    });
  });
*/


var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var mongoclient = new MongoClient(mongodbServer, {native_parser: true});

var database;

mongoclient.connect('mongodb://localhost:27017/test', {}, function(err, db) {
  if (err) {
    console.log("connect error!");
  }
  database = db;
  //console.log("db=", db);
});


/*
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
*/


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send(rootPage);
});


app.get('/account', function (req, res) {
  res.send('GET request');
});

app.post('/account', (req, res) => {
  database.collection('Account').insert({"A":"B"}, (err, result) => {
    if(err) {
        console.log("insert error!", err);
        res.send('error insert!');
    }
    else
    {
      res.send(result);
    }
  });
});

app.patch('/account', function (req, res) {
  res.send('patch request');
});

app.delete('/account', function (req, res) {
  res.send('delete request');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

