var http = require('http');
var app = require('./app');


var server = http.createServer(app);
var port = process.env.PORT || 3000;

app.listen(port, function(error) {
  if (error) {
    console.error(error);
    return process.exit(3);
  }
  console.info("server started listenner");
});

//if(module.hot) {
//  module.hot.accept();
//  //module.hot.accept('./app');

//  module.hot.dispose(function() {
//    server.close();
//  });
//}
