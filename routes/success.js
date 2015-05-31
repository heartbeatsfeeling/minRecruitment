module.exports = function(app) {
	var config = require('../config');
	app.get('/success', function(req, res) { //提交微招聘成功页面
		var session = req.session;
		var id = session.jsonId;
		var skin = session.skinId;
		if (!id) {
			res.redirect('/');
			return;
		}
		res.render('success', {
			url: config.domain + '/view?id=' + id + "&skin=" + skin
		});
	});
}