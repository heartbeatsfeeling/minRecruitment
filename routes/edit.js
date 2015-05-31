module.exports = function(app) {
	var crypto = require('crypto');
	var fs = require('fs');
	app.get('/edit', function(req, res) { //编辑页面
		var jobList = req.session.jobList
		if (jobList) {
			res.render('edit', jobList);
		} else {
			res.redirect('/login');
		}
	});
	app.post('/update', function(req, res) { //编辑
		var postData = req.body;
		var jobList = [];
		var isAjax = req.xhr;
		var pathName = postData.pathName; //路径
		var hash = crypto.createHash('md5');
		hash.update(pathName);
		var fileName = hash.digest('hex');
		//转化成数组
		var posName = [].concat(postData.posName);
		var posJd = [].concat(postData.posJd);
		var posBase = [].concat(postData.posBase);
		var posMoney = [].concat(postData.posMoney);
		//整理数据
		posName.forEach(function(item, i) {
			jobList.push({
				posName: item,
				posJd: posJd[i],
				posBase: posBase[i],
				posMoney: posMoney[i]
			})
		});
		//存放数据
		postData.jobList = jobList;
		req.session.jobList = postData;
		if (pathName) {
			if(req.xhr){
				//生成文件---以后改成数据库
				fs.writeFile('upload/' + fileName + '.json', JSON.stringify(postData), function(error) {
					if (error) {
						delete req.session.jsonId;
						delete req.session.skinId;
						res.json({
							status: false,
							msg:"系统错误！"
						});
					} else {
						req.session.jsonId = fileName;
						req.session.skinId = postData.skinId || 0
						res.json({
							status: true
						});
					}
				});
			}else{
				fs.writeFile('upload/' + fileName + '.json', JSON.stringify(postData), function(error) {
					if (error) {
						delete req.session.jsonId;
						delete req.session.skinId;
						res.redirect('500');
					} else {
						req.session.jsonId = fileName;
						req.session.skinId = postData.skinId || 0
						res.redirect('success');
					}
				});
			}
			
		} else { //为空
			res.redirect('500');
		}
	});
}