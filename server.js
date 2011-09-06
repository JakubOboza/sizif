var sys   = require("sys"),
    http  = require("http"),
    url   = require("url"),
    path  = require("path"),
    fs    = require("fs");

var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    GridStore = require('mongodb').GridStore;

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

console.log("Connecting to Mongo at " + host + ":" + port);
var mongo_db = new Db('panda_development', new Server(host, port, {}), {native_parser:true});

mongo_db.open(function(err, db) {
  http.createServer(function(request, response) {
        var uri = url.parse(request.url).pathname;
        var filename = uri.substr(1); //path.join(process.cwd(), uri);


          var gridStore = new GridStore(db, filename, "r");

              gridStore.open(function(err, gridStore) {
                gridStore.read(function(err, data){
                  if(data){
                    response.writeHead(200, {"Content-Type": gridStore.contentType});
                    response.write(data, "binary");
                    response.end();
                  }else{
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.end("File not found");
                  }
                });
              //db.close();
              //});
       });

    }).listen(8080);

});

console.log("Server running at http://localhost:8080/");


/*
TESTING: on carrierwave files uploaded through rails app
FIXME: Had to add workaround because GridStore.exist is blowing up on collection for not existing files
TODO: clear this mess up
*/
