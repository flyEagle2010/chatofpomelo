var express = require('express');
var app = express();

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
	app.set('view engine', 'jade');
	app.set('view options', {layout: false});
  app.set('basepath', __dirname + '/public');
  app.set('views', __dirname + '/public/view');
  
});

app.configure('development', function(){
	app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.get('/', function (req, res) {
    res.render('main');
  })
});

app.configure('production', function(){
	var oneYear = 31557600000;
	app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
	app.use(express.errorHandler());
});

console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");
app.listen(3001);
