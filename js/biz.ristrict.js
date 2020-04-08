biz.ristrict = {
	reqRistrict: ({success}) => {
		$.ajax({
			type: "GET",
			url: biz.server.getApi('ristrictReuqst'),
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
	ristrictRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		biz.ristrict.reqRistrict({
			success: json => {
				console.log(json)

				const listList0 = template.render(tplWrap['tpl-listList0'], json.listes[0]);
				$box.find(".tpl-listList0").html(listList0).initUI();

				const listList1 = template.render(tplWrap['tpl-listList1'], json.listes[1]);
				$box.find(".tpl-listList1").html(listList1).initUI();

				const listList2 = template.render(tplWrap['tpl-listList2'], json.listes[2]);
				$box.find(".tpl-listList2").html(listList2).initUI();
			}
		})
	},
	fromRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		if(params.name && params.time) {
			const html = template.render(tplWrap.tpl, params);
			$box.html(html).initUI();
		}
	},
	reservationRender: function (tpl, params) {
		const $box = $(this);
		const tplWrap = $.templateWrap(tpl);

		const html = template.render(tplWrap.tpl, params);
		$box.html(html).initUI();

		let result = [];

		console.log(params)

		$box.find('input[type="button"]').click(function () {
			$box.find('input[type="text"]').each(function(){
				result.push($(this).val())
			});

			$box.find('input[type="date"]').each(function(){
				result.push($(this).val())
			});

			$box.find('textarea').each(function(){
				result.push($(this).val())
			});

			$.alert.confirm('确定要提交预约申请吗？', {
				okCall: function () {
					console.log(result)
				},
				cancelCall: function () {

				}
			});
		})

	},
	goto: function (item) {
		console.log(item)
		$.navView.open({
			url: `tpl/ristrict/form.html?dwz_callback=biz.ristrict.fromRender`,
			data: item,
			rel: '4'
		});
	}
}
