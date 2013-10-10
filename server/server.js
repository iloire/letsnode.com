// Just a basic server setup for this site
var Stack = require('stack'),
    Creationix = require('creationix'),
    Http = require('http');

var port = parseInt(process.argv[2], 10) || 8080

Http.createServer(Stack(
  Creationix.log(),
  require('wheat')(__dirname +"/..")
)).listen(port);

console.log('Server listening at port ' + port);
