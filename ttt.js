var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

var http = require('http');
var fs = require('fs');
var stats = require('./stats.js');



//create a server object:
http.createServer(function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    if (req.url == "/getList") {
        dbo.collection("elements").find({}).toArray(function(err, result) {
            if (err) throw err;
            var avg = stats.average(result)
            console.log(avg, typeof(avg));
            var tbs = [avg, stats.next(result, avg), result]
            res.write(JSON.stringify(tbs)); //write a response to the client
            db.close();
            res.end(); //end the response
        });
    }
    else if (req.url == "/addElement") {
        var min = 1546293600000;
        var max = 1577743200000;
        var x = Math.floor(Math.random() * (max - min)) + min;
        dbo.collection("elements").insertOne({date: x}, function(err, result) {
            if (err) throw err;
            db.close();
            res.write("OK"); //write a response to the client
            res.end();
        })
    }
    else if (req.url == "/styles.css") {
        fs.readFile('styles.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }
    else if (req.url == "/script.js") {
        fs.readFile('script.js', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }
    else if (req.url == "/calendar.html"){
        fs.readFile('./calendar.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    else {
        fs.readFile('./ui.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    
  });
  
}).listen(8080); //the server object listens on port 8080

/*
return:
{average: 27, expectedNext: 1234567, list: []}
*/