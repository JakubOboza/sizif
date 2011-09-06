var Sizif = require("./lib/sizif");
/*
var database_name = process.env["SIZIF_DATABASE"] ? process.env["SIZIF_DATABASE"] : "panda_development" ;
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

*/

var sizif = new Sizif({
    database: process.env["SIZIF_DATABASE"]
});


/*
TESTING: on carrierwave files uploaded through rails app
FIXME: Had to add workaround because GridStore.exist is blowing up on collection for not existing files
TODO: clear this mess up
*/
