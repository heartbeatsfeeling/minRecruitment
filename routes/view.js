module.exports = function(app) {
	var fs=require('fs');
	app.get('/view', function(req, res) { //微招聘浏览页面
		var data = req.query;
		var id = data.id;
		var skin = data.skin;
		//vaild
		fs.readFile('upload/' + id + ".json", {
			'encoding': "utf-8"
		}, function(error, data) {
			if (error) {
				res.redirect('404');
			} else {
				//error detect
				res.render('view', JSON.parse(data))
			}
		});
	});
}