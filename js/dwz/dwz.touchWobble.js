(function ($) {

	$.fn.touchWobble = function (options) {
		var op = $.extend({maxRotateY: 5, maxRotateX: 5, transition: '.5s linear'}, options);

		return this.each(function () {
			var $box = $(this);

			function boxWobble(pos) {
				var elmOffset = $box.offset();
				var elmPos = {
					x: pos.x - elmOffset.left,
					y: pos.y - elmOffset.top
				};
				var centerPox = {
					x: elmOffset.width / 2,
					y: elmOffset.height / 2
				};
				// console.log(pos, elmPos, centerPox);

				var rotateX = op.maxRotateX * (elmPos.x - centerPox.x) / centerPox.x,
					rotateY = -op.maxRotateY * (elmPos.y - centerPox.y) / centerPox.y;

				// console.log(rotateX, rotateY);

				$box.css({
					transition: op.transition,
					transform: 'rotateY(' + rotateX + 'deg) rotateX(' + rotateY + 'deg)'
				});
			}

			$box.touchwipe({
				// stopPropagationEvents:true,
				direction: 'all',

				touchstart: function (event, pos) {
					boxWobble(pos);
				},
				touchmove: function (event, pos) {
					boxWobble(pos);
				},
				touchend: function (event, pos) {
					setTimeout(function () {
						$box.css({
							transition: op.transition,
							transform: 'rotateX(0deg) rotateY(0deg)'
						});
					}, 100);
				}
			});
		});

	}
})(dwz);
