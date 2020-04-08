/**
 * Created by zhanghuihua on 2016/12/19.
 */

$.fn.extend({
	/**
	 * options: currentIndex[default index 0]
	 *      tab$[tabs selector],
	 *      panel$[tab panel selector]
	 *      ajaxClass[ajax load]
	 */
	tabs: function (options) {
		var op = $.extend({currentIndex:0, tab$:":scope > .tab-bar > .tab-item", panel$:":scope > .tab-panel > .panel-item", ajaxClass:"j-ajax"}, options);


		return this.each(function () {
			var $box = $(this),
				$tabs = $box.find(op.tab$),
				$panels = $box.find(op.panel$);

			$tabs.each(function (iTabIndex) {
				var $tab = $(this);
				if (op.currentIndex == iTabIndex) $tab.addClass("active");
				else $tab.removeClass("active");

				$tab.click(function (event) {
					switchTab($tabs, $panels, iTabIndex);
				});

				$("a", this).each(function () {
					var $link = $(this);
					if ($link.hasClass(op.ajaxClass)) {
						$link.click(function (event) {
							var $panel = $panels.eq(iTabIndex);
							if (this.href && !$panel.attr("loaded")) {
								$.ajax({
									type: op.type,
									url: op.url,
									data: op.data,
									success: function (html) {
										$panel.triggerPageClear().find(dwz.config.pageClear$).triggerPageClear();

										$panel.html(html).initUI();
										$panel.attr("loaded", true);
									}
								});
							}
							event.preventDefault();
						});
					}
				});
			});

			switchTab($tabs, $panels, op.currentIndex);
		});

		function switchTab($tabs, $panels, iTabIndex) {
			var $tab = $tabs.eq(iTabIndex);
			op.currentIndex = iTabIndex;

			$tabs.removeClass("active");
			$tab.addClass("active");

			$panels.removeClass('active').eq(op.currentIndex).addClass('active');
		}

	}
});
