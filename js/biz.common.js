$._ajax = $.ajax;
$.extend({
	ajax: function (options) {
		var header = {'X-Authorization': UserInfo.token};

		// 请求header中添加设备信息
		if (window.deviceInfo) {
			var info = {};
			for (var key in deviceInfo) {
				info['device-' + key] = deviceInfo[key];
			}
			$.extend(header, info);
		}

		var op = $.extend({data: {}, header: header}, options);
		// 统一传token，防止旧的接口部分没传token引起的问题
		if (!op.data.token) {
			op.data.token = UserInfo.token;
		}
		if (biz.server.ENV == 'DEV') {
			op.type = 'GET';
		}

		$._ajax(op);
	}
});

$.extend(biz, {
	safeAreaTop: 0,
	fixStatusBar: function ($p) {
		$p.find('header').css({'padding-top': biz.safeAreaTop + 'px'});
	},
});

$.extend({
	html: function (elem, content) {
		if (content === undefined) {
			return elem.innerHTML;
		} else {
			if (typeof content == 'string') {

				// 第一步：匹配加载的页面中是否含有js
				var regDetectJs = /<script(.|\n)*?>(.|\n|\r\n)*?<\/script>/ig;
				var jsContained = content.match(regDetectJs); //ajaxLoadedData为ajax获取到的数据
				var tplWrap = {tpl: content.replace(regDetectJs, '') || ''}; //删除script标签

				elem.innerHTML = tplWrap.tpl; // 插入页面

				// 第二步：如果包含js，则一段一段的取出js再加载执行
				if (jsContained) {
					// 分段取出js正则
					var regGetJS = /<script(.|\n)*?>((.|\n|\r\n)*)?<\/script>/im;

					// 按顺序分段执行js
					var jsNums = jsContained.length;
					for (var i = 0; i < jsNums; i++) {
						var $script = $(jsContained[i]), _type = $script.attr('type'), _id = $script.attr('id');
						var jsSection = jsContained[i].match(regGetJS);

						if (jsSection[2]) {
							if (_type == 'text/html' && _id) {
								tplWrap[_id] = jsSection[2];
							} else {
								window.dwzHtmlObj = {$el: $(elem), tplWrap: tplWrap, html: content};
								var _evalFn = '(function($box, tplWrap, html){' + jsSection[2] + '})(window.dwzHtmlObj.$el, window.dwzHtmlObj.tplWrap, window.dwzHtmlObj.html)';
								if (window.execScript) {
									window.execScript(_evalFn); // 给IE的特殊待遇
								} else {
									window.eval(_evalFn); // 给其他大部分浏览器用的
								}
							}

						}
					}
				}
			} else {
				elem.innerHTML = content;
			}

		}
	}
});

function pageRender(tpl, params) {
	var $box = $(this);
	if (params.iframe_url) {
		params.iframe_url = params.iframe_url.replaceAll('###', '?').replaceAll('##', '=');
	}

	// 获取headerhtml代码片段
	params.headerFrag = menuUtil.headerFrag(params);

	var html = template.render(tpl, params);
	$box.html(html).initUI();
}

function staticRender(tpl, params) {
	let $box = $(this).data('params', params);

	// 获取headerhtml代码片段
	let headerFrag = menuUtil.headerFrag(params);

	let html = tpl.replaceAll('{{#headerFrag}}', headerFrag);
	$box.html(html).initUI();
}

