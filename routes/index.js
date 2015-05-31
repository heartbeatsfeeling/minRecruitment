module.exports=function(app){
	require('./register.js')(app);
	require('./login.js')(app);
	require('./edit.js')(app);
	require('./success.js')(app);
	require('./view.js')(app);
	require('./ajax.js')(app);
};