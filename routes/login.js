module.exports = function(app) {
	var crypto=require('crypto');
	var fs=require('fs');
	app.get('/login', function(req, res) { //模板识别码输入页面
		res.render('login', {
			error: ""
		});
	});
	app.post('/login', function(req, res) { //模板识别码form提交页面
		var pathName = req.body.editPath;
		if (pathName) { //
			var hash = crypto.createHash('md5');
			hash.update(pathName);
			var uuid = hash.digest('hex')
			fs.readFile('upload/' + uuid + ".json", {
				'encoding': "utf-8"
			}, function(error, data) {
				if (error) {
					res.render('login', {
						error: "模板识别码不存在！"
					});
				} else {
					req.session.jobList = JSON.parse(data);
					res.redirect('/edit');
				}
			});
		} else {
			res.render('login', {
				error: "模板识别码不能为空！"
			});
		};
	});
};