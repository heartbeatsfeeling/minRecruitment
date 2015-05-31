var fs = require('fs');
var express = require('express');
var app = express();
var config = require('./config');
var log4js = require('log4js');
var crypto = require('crypto');
//log
log4js.configure({
	appenders: [{
		type: "console"
	}, {
		type: 'file',
		filename: 'logs/access.log',
		maxLogSize: 1024 * 1024 * 1000,
		backups: 4,
		category: 'normal'
	}],
	replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {
	format: ':method :url :remote-addr'
}));
//end log
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'jade');
app.set('views', __dirname + "/views");
app.use(require('body-parser')());
app.use(require('express-session')({
	secret: 'keyboard cat'
}));
app.get('/', function(req, res) { //首页
	res.render('index');
});
require('./routes')(app);
//500
app.get('/500', function(req, res) {
	res.render('500');
});
//404
app.use(function(req, res) { //404
	res.render('404');
});
app.use(function(err, req, res) { //500
	res.render('500');
});
app.listen(3000);