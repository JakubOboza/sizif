var sys   = require("sys"),
    http  = require("http"),
    url   = require("url"),
    path  = require("path"),
    fs    = require("fs");

var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    GridStore = require('mongodb').GridStore;

function Sizif(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  this.settings = {
    database: options.database ? options.database : "panda_development",
    host: options.host ? options.host : 'localhost' ,
    dbport: options.dbport ? options.dbport : Connection.DEFAULT_PORT,
    port:  options.port ? options.port : 8080
  };

  this.init();
};

Sizif.prototype.version = function(){
  return "0.0.1";
};

Sizif.prototype.init = function(){
var sizif_port = this.settings.port;
console.log("Connecting to Mongo at " + this.settings.host + ":" + this.settings.dbport);
var mongo_db = new Db(this.settings.database, new Server(this.settings.host, this.settings.dbport, {}), {native_parser:true});

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
       });

    }).listen(sizif_port);

});

  console.log("Server running at http://" + this.settings.host + ":" + this.settings.port +"/");
};

module.exports = Sizif;
