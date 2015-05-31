document.onreadystatechange = loading;

function loading() {
	if (document.readyState == "complete") {
		$("#loading").hide();
		$("#content").show();
		playbksound();
	}
}

function shareDialog() {
	$("#share").show();
}

function closeDialog() {
	$("#share").hide();
};
//weixin
var imgUrl = 'http://weixin.zto.cn/html/job/images/job-logo.png';
var lineLink = 'http://weixin.zto.cn/html/job/?v=' + Math.round(Math.random() * 999) + 3000;
var descContent = "让我们一起闯荡江湖，让我们一起创造奇迹！";
var shareTitle = '找的就是你，被埋没是一种罪过——XXXX企业喊你来面试啦！';
var appid = 'wxdb943f961ca9da9d';
gSound = 'images/1.mp3';