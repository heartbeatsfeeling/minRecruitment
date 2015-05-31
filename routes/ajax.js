module.exports = function(app) {
	var fs=require('fs');
	var crypto=require('crypto');
	app.post('/userPath', function(req, res) { //模板密码重复验证
		var pathName = req.body.pathName;
		var hash = crypto.createHash('md5');
		var fileName = '';
		if (!pathName) {
			res.json({
				status: false,
				msg: '模板密码不能为空！'
			});
			return
		};
		hash.update(pathName);
		fileName = hash.digest('hex') + ".json";
		fs.readdir('upload', function(err, data) {
			if (err) { //读取文件夹
				res.json({
					status: false,
					msg: '系统错误！'
				});
			} else {
				if (data.indexOf(fileName) !== -1) { //重复
					res.json({
						status: false,
						msg: '模板密码重复！'
					});
				} else {
					res.json({
						status: true,
						msg: '成功！'
					});
				}

			}
		});
	});
};