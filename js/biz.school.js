biz.school = {
	reqSchool: ({success}) => {
		$.ajax({
			type: "GET",
			url: biz.server.getApi('schoolRequst'),
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
	reqAnnouncement: ({success}) => {
		$.ajax({
			type: "GET",
			url: biz.server.getApi('announcementReuqst'),
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
	reqAreaServices: ({success}) => {
		$.ajax({
			type: "GET",
			url: biz.server.getApi('areaServicesReuqst'),
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
	schoolRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		biz.school.reqSchool({
			success: json => {
				console.log(json)

				const listTwo = template.render(tplWrap['tpl-listTwo'], json);
				$box.find(".tpl-listTwo").html(listTwo).initUI();

				const listList = template.render(tplWrap['tpl-listList'], json);
				$box.find(".tpl-listList").html(listList).initUI();


				$.each($box.find(".list>.item"), function (index, el) {
					$(this).click(function () {
						let $listId = $box.find(".list>.item").eq(index).attr("data-index");
						let $type = $box.find(".list>.item").eq(index).attr("data-type");
						$.navView.open({
							url: `tpl/school/announcement-list.html?dwz_callback=biz.school.listRender&listId=${$listId}&type=${$type}`,
							rel: ''
						});
					})
				});

				$.each($box.find(".flex-wrap>.school-announcement"), function (index, el) {
					$(this).click(function () {
						let $listId = $box.find(".flex-wrap>.school-announcement").eq(index).attr("data-index");
						let $type = $box.find(".flex-wrap>.school-announcement").eq(index).attr("data-type");
						$.navView.open({
							url: `tpl/school/announcement-list.html?dwz_callback=biz.school.listRender&listId=${$listId}&type=${$type}`,
							rel: '0'
						});
					})
				});
			}
		})

	},
	listRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		console.log(params.listId)
		console.log(params.type)

		biz.school.reqAnnouncement({
			success: json => {
				console.log(json)

				for (let i = 0; i < json.listes.length; i++) {
					console.log(json)
					if (params.type == json.listes[i].type) {
						const listList = template.render(tplWrap['tpl-listList'], json.listes[i]);
						$box.find(".tpl-listList").html(listList).initUI();
					}
				}
			}
		})
	},
	servicesRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		biz.school.reqAreaServices({
			success: json => {
				const listList1 = template.render(tplWrap['tpl-listList1'], json);
				$box.find(".tpl-listList1").html(listList1).initUI();
				const listList2 = template.render(tplWrap['tpl-listList2'], json);
				$box.find(".tpl-listList2").html(listList2).initUI();
			}
		})
	},
	articleRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();
	},
	goto: function (item) {
		$.navView.open({
			url: `tpl/school/article.html?dwz_callback=biz.school.articleRender`,
			data: item,
			rel: '4'
		});
	}
}
