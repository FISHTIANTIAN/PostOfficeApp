// 用户登入信息
var UserInfo = {
	On : false
};
var UserInfoUtil = {
	update: function () {
		UserInfo.On = true;
		$.setStorage('APP_USER_INFO', UserInfo);
	},
	clear: function () {
		UserInfo = {};
		$.setStorage('APP_USER_INFO', UserInfo);
	}
};

function initUserInfo() {

	// 获取localStorage中用户信息
	if (!UserInfo.On) {
		UserInfo = $.getStorage('APP_USER_INFO') || {};
	}
}

// 检测用户登入状态
dwz.urlInterceptor = function (url) {
	var pass = UserInfo.On ? true : false;

	if (!pass) {
		var uris = [
			'tpl/login.html'
		];

		// 判断request URI 是否需要登入
		if (dwz.inArray(url.getRequestURI(), uris)) {
			pass = true;
		}
	}

	if (!pass) {
		$.gotoLogin();
		return false;
	}
	return true;
};

// 用户注册表单提交回调函数
function loginAjaxDone(json) {
console.log(json)
console.log(json[dwz.config.keys.statusCode])
	if (json[dwz.config.keys.statusCode] == dwz.config.statusCode.ok) {

		UserInfoUtil.update();

		// $.dialog.close();
		$.navTab.open({url: 'tpl/school/index.html?dwz_callback=biz.school.schoolRender', tabid: 'school'});
	} else {
		$.alert.error("账号或者密码错误！");
		console.log(UserInfo.username,UserInfo.password)
	}
}

// 登入页面
function loginRender(tpl, params) {
	var $box = this;

	var json = {
		form_url: biz.server.getLoginUrl()
	};

	var html = template.render(tpl, json);
	$box.html(html).initUI();
}
