/**
 * DWZ Mobile Framework: UI plugins
 * @author z@j-ui.com
 */

(function ($) {

	$.config.frag.external = '<iframe src="{url}" style="width:100%;height:{{height}};" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>';

	dwz.regPlugins.push(function ($p) {

		if ($.fn.touchSlide) {
			$('div.slideBox', $p).each(function () {
				var $box = $(this);
				$box.touchSlide({
					currentIndex: $box.attr('data-open-index') || 0,
					autoCss: false,
					autoPlay: $box.attr('data-auto-play') == 'false' ? false : true,
					loop: $box.attr('data-loop') == 'false' ? false : true,
					zoom: $box.attr('data-zoom') == 'true' ? true : false
				});
			});
		}

		if ($.navTab) {
			$('a[target=navTab]', $p).touchwipe({
				touch: function (event) {
					var $link = $(this),
						url = $link.attr('data-href');
					var params = url.getParams();
					$.navTab.open({
						tabid: $link.attr('rel'),
						url: url,
						data: params
					});
					event.preventDefault();
				}
			}).hrefFix();
		}

		if ($.navView) {

			$('a[target=navView], li[target=navView]', $p).touchwipe({
				touch: function (event) {
					var $link = $(this),
						url = $link.attr('data-href');
					var params = url.getParams();
					$.navView.open({
						url: url,
						rel: $link.attr('rel') || '_blank',
						data: params,
						external: $link.attr('data-external') || false
					});
					event.preventDefault();
				}
			}).hrefFix();

			$('div.nav-view .back-button', $p).click(function (event) {
				$.navView.close(true, true);
				event.preventDefault();
			});
		}

		if ($.dialog) {

			$('a[target=dialog], li[target=dialog]', $p).touchwipe({
				touch: function (event) {
					var $link = $(this);
					$.dialog.open({url: $link.attr('data-href'), pop: $link.attr('data-pop') || ''});
					event.preventDefault();
				}
			}).hrefFix();

			$('img[target=dialog], a[target=dialog-pic]', $p).touchwipe({
				touch: function (event) {
					var $img = $(this);
					$.dialog.open({
						url: $img.attr('data-href'),
						pop: 'pic',
						data: {src: $img.attr('data-src') || $img.attr('src')}
					});
					event.preventDefault();
				}
			});

			$('#dialog .pop-close', $p).click(function (event) {
				$.dialog.close();
				event.preventDefault();
			});
		}

		if ($.dropPanel) {
			$('a[target=dropPanel], li[target=dropPanel]', $p).touchwipe({
				touch: function (event) {
					var $link = $(this);
					$.dropPanel.open({url: $link.attr('data-href')});
					event.preventDefault();
				}
			}).hrefFix();
		}
		if ($.popPanel) {
			$('a[target=popPanel], li[target=popPanel]', $p).touchwipe({
				touch: function (event) {
					var $link = $(this);
					$.popPanel.open({url: $link.attr('data-href')});
					event.preventDefault();
				}
			}).hrefFix();
		}

		if ($.fn.tabs) {
			$("div.dwz-tabs", $p).each(function(){
				var $this = $(this);
				$this.tabs({currentIndex:$this.attr("data-open-index") || 0});
			});
		}

		if ($.alert) {
			$('a[target=alertDialog]', $p).touchwipe({
				touch: function (event) {
					var $link = $(this);
					$.alert.openDialog($link.attr('data-href'));
					event.preventDefault();
				}
			}).hrefFix();

			$('#alertMsgBox .close', $p).click(function (event) {
				$.alert.close();
				event.preventDefault();
			});

			$('#alertDialogBox .close', $p).click(function (event) {
				$.alert.closeDialog();
				event.preventDefault();
			});
		}


		if ($.fn.panel) {
			$('div.m-panel.dwz-collapse', $p).panel();
		}
		if ($.altPanel) {
			$('a[target=altPanel]', $p).touchwipe({
				touch: function (event, pos) {
					var $link = $(this);
					$.altPanel.open({url: $link.attr('data-href'), pos: pos});
					event.stopPropagation();
				}
			}).hrefFix();
		}

		if ($.fn.toggleSelectRef) {
			$("select.toggleSelectRef", $p).each(function () {
				var $this = $(this).toggleSelectRef();
			});
		}

		$('input.dwz-disable-autofocus', $p).disableAutofocus();

		if ($.fn.touchWobble) {
			$('div.dwz-wobble', $p).touchWobble();
		}

		$('div.dwz-ctl-eye', $p).each(function () {
			var $me = $(this), $input = $me.find('input[type=text], input[type=password]');

			$me.find('.icon-eye').touchwipe({
				touch: function () {
					if ($me.hasClass('eye-close')) {
						$me.removeClass('eye-close').addClass('eye-open');
						$input.attr('type', 'text');
					} else {
						$me.addClass('eye-close').removeClass('eye-open');
						$input.attr('type', 'password');
					}
				}
			})
		});

		$('.dwz-ctl-active', $p).activeClass('hover');

		$('a[target=ajaxTodo]', $p).ajaxTodo('active');

		if ($.fn.dropdown) $('div.dropdown', $p).dropdown();

		// 处理<a href="javascript:xxFn()"> 点击有时失效问题
		$('a[target=javascript]', $p).touchwipe({
			touch: function(event) {
				var $link = $(this),
					url = $link.attr('href');

				if (url && url.startsWith('javascript:')) {
					url = url.replace('javascript:', '');
					dwz.eavl(url);

					// 播放音效
					if ($.clickMedia) {
						$.clickMedia.play();
					}
				}

				event.preventDefault();
			}
		});

		// 解决3399主板android7 video loop属性不能循环播放问题
		// $('video[loop]', $p).each(function(){
		// 	console.log('check video loop...');
		// 	var video = this;
		// 	video.loop = false;
		// 	$(video).on('ended error', function() {
		// 		console.log('video ended');
		// 		video.currentTime = 0;
		// 		// video.play();
		// 		video.load();
		// 	}, false);
		// });

		// 视频播放完成出现重播按钮
		$('a.dwz-video-replay', $p).each(function () {
			var $link = $(this);
			var $video = $link.parentsUnitBox().find('video');

			//ended error abort
			$video.on('ended error', function(){
				$link.show();
			});
			if ($video.size()>0) {
				var video = $video.get(0);

				if (video.autoplay) {
					$link.hide();
				}
				$link.touchwipe({
					touch: function () {
						// video.currentTime = 0.1;
						// video.play();
						video.load();
						$link.hide();
					}
				});
			}
		});

		setTimeout(function() {
			$('div.dwz-scroll', $p).scroll();

			$('div.dwz-scroll-x', $p).scroll({
				scrollX: true,
				scrollY: false,
				scroll$: '.scroll-x'
			});

		}, 800);
	});


	$.fn.extend({
		disableAutofocus: function () {
			return this.each(function () {
				var $input = $(this);
				$input.attr('readonly', 'readonly');
				setTimeout(function () {
					$input.removeAttr('readonly');
				}, 600);
			});
		},
		redirect: function () {
			return this.each(function () {
				$(this).touchwipe({
					touch: function (event) {
						var href = $(this).attr('href');
						if (href) window.location = href;
						event.preventDefault();
					}
				});
			});
		},
		activeClass: function (className) {
			if (!className) className = 'active';

			return this.each(function () {
				var $this = $(this);

				if ($.event.hasTouch) {
					$this.on('touchstart', function (e) {
						if ($.clickMedia) {
							$.clickMedia.prepare(e, true);
						}
						$this.addClass(className);
					});
					$this.on('touchmove', function (e) {
						if ($.clickMedia) {
							$.clickMedia.prepare(e, false);
						}
					});
					$this.on('touchend', function (e) {
						if ($.clickMedia) {
							$.clickMedia.play(true);
						}
						$this.removeClass(className);
					});
				} else {
					$this.on('mousedown', function () {
						if ($.clickMedia) {
							$.clickMedia.play();
						}
						$this.addClass(className);
					});
					$this.on('mouseup mouseout', function () {
						$this.removeClass(className)
					});
				}

			});
		},

		checkboxRadio: function () {
			return this.each(function () {
				var $this = $(this),
					parent$ = $this.attr('data-checkbox-radio') || 'form',
					name = $this.attr('name');

				$this.on('change', function (event) {
					if (this.checked) {
						var $parent = $this.parentsUntil(function () {
							return $(this).is(parent$);
						});

						$parent.find('input[name=' + name + ']').each(function () {
							if (event.target !== this) this.checked = false;
						});
					}
				});

			});
		},

		/**
		 * ref: 控制多个box使用|分隔
		 * refVal: 控制多个box使用"|"分隔；每个box控制多个value使用","分隔
		 * ctrShow: 默认false控制隐藏，为true时控制显示
		 * @param options
		 * @returns {*}
		 */
		toggleSelectRef: function (options) {
			var op = $.extend({ref: "data-ref-box", refVal: "data-ref-val", ctrShow: "data-ctr-show"}, options);
			return this.each(function () {
				var $select = $(this);

				function _checkRefHide(refVal, ctrShow) {
					var val = $select.val();

					if (ctrShow) {
						if (!val || val == refVal) return false;
						if (refVal) {
							var aTmp = refVal.split(',');
							for (var i = 0; i < aTmp.length; i++) {
								if (val == aTmp[i]) return false;
							}
						}

						return true;

					} else {
						if (!val || val == refVal) return true;
						if (refVal) {
							var aTmp = refVal.split(',');
							for (var i = 0; i < aTmp.length; i++) {
								if (val == aTmp[i]) return true;
							}
						}

						return false;
					}

				}

				function _toggle($ref, refVal, ctrShow) {

					if (_checkRefHide(refVal, ctrShow)) {
						var bParentRef = false;

						$ref.find(':input').filter(function () {
							var type = this.type;

							// Use .is( ":disabled" ) so that fieldset[disabled] works
							return this.name && !dwz(this).is(":disabled") &&
								dwz.config.rsubmittable.test(this.nodeName) &&
								!dwz.config.rsubmitterTypes.test(type);
						}).each(function () {
							var $input = $(this);
							if ($input.get(0) == $select.get(0)) {
								bParentRef = true;
							} else {
								if ($input.is(':checkbox')) $input.attr('checked', false);
							}
						});

						if (!bParentRef) $ref.hide().find(':input').addClass('ignore');
					} else {
						$ref.show().find(':input').removeClass('ignore');
					}
				}

				function _toggleAll() {
					var refList = $select.attr(op.ref).split('|');
					var refValList = $select.attr(op.refVal).split('|');
					var ctrShow = $select.attr(op.ctrShow) || false;

					for (var i = 0; i < refList.length; i++) {
						var $ref = $(refList[i]),
							refVal = refValList[i];
						_toggle($ref, refVal, ctrShow);
					}

				}

				_toggleAll();
				$select.change(_toggleAll);
			});
		}

	});

})(dwz);
