var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');

//loopback 
const loopback = require('loopback');
const boot = require('loopback-boot');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo');


// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);
	app.set('connectorConfig', {
		connector: pomelo.connectors.sioconnector,
		// 'websocket', 'polling-xhr', 'polling-jsonp', 'polling'
		transports: ['websocket', 'polling'],
		heartbeats: true,
		closeTimeout: 60 * 1000,
		heartbeatTimeout: 60 * 1000,
		heartbeatInterval: 25 * 1000
	});
	// filter configures
	app.filter(pomelo.timeout());
});

boot(loopback, __dirname, function (err) {
  if (err) {
    console.error({ err }, 'loopback 启动出错');
  }
});


// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});