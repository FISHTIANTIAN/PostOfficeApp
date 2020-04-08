biz.my = {
	reqHistory: ({success}) => {
		$.ajax({
			type: "GET",
			url: biz.server.getApi('historyReuqst'),
			dataType: "json",
			data: '',
			cache: false,
			global: false,
			success: json => {
				if (json[dwz.config.keys.statusCode] == dwz.config.statusCode.ok) {
					const data = json.data || {};
					success && success(data);
				}
			},
			error: dwz.ajaxError
		});
	},
	myrender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

	},

	historyRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		biz.my.reqHistory ({
			success: json => {
				console.log(json)

				const listList = template.render(tplWrap['tpl-listList'], json);
				$box.find(".tpl-listList").html(listList).initUI();
			}
		})
	},

	attestRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();
	},

	feedbackRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();
	},

	aboutRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();
	},

	settingRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		$('#exitSystemButton').touchwipe({
			touch: function () {
				$.alert.confirm('确定要退出登录吗？', {
					okCall:function(){

						UserInfoUtil.clear();

						$.gotoLogin();
					},
					cancelCall:function(){

					}
				});
			}
		});
	},

	passwordRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		$box.find(".sub").click(function () {

			let password1 = $box.find('input[type="password"]').eq(0).val();
			let password2 = $box.find('input[type="password"]').eq(1).val();
			let password3 = $box.find('input[type="password"]').eq(2).val();

			if (password1 === password2 && password1 && password2) {
				$.alert.toast('新密码不要和旧密码一致！');
			}else if(!password1) {
				$.alert.toast('旧密码不能为空！');
			}else if(!password2 && password1) {
				$.alert.toast('新密码不能为空！');
			}else if(password2 && password1 && !password3) {
				$.alert.toast('请再次输入新密码！');
			}else if(password2 && password1 && password3 && password3 != password2) {
				$.alert.toast('两次新密码不一致！');
			}else if(password2 && password1 && password3 && password2 === password3) {
				$.alert.confirm('修改成功，请重重新登录！', {
					okCall:function(){
						UserInfoUtil.clear();
						$.gotoLogin();
					},
					cancelCall:function(){
					}
				});
			}
		})
	},

	reservationRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

	},
}
