/**
 * Created by zhanghuihua on 26/12/2017.
 */
$.baseMedia = {
	_id: null,
	media: null,
	init: function (url) {
		if (!this.media) {

			if (window.cordova && window.Media) { // for cordova
				this.media = new window.Media(url,
					function () {
						console.log("playAudio():Audio Success");
					},
					function (err) {
						console.log("playAudio():Audio Error: " + err);
					}
				);
			} else {
				this._id = 'media_' + Math.round(Math.random() * 10000000);
				var html = '<audio id="' + this._id + '" hidden preload="auto"><source src="' + url + '" type="audio/wav"></audio>';
				$('body').append(html);
				this.media = $('#' + this._id).get(0);
			}

		}
	},
	_play: function () {
		if (this.media) {
			this.media.play();
		}
	},
	play: function () {
		this._play();
	}
};

$.slideMedia = $.extend({}, $.baseMedia);

$.clickMedia = $.extend({}, $.baseMedia, {

	prepare: function (event, isTouchStart) {
		if (event.touches.length == 1) {
			this.endX = event.touches[0].pageX;
			this.endY = event.touches[0].pageY;
			if (isTouchStart) {
				this.startX = this.endX;
				this.startY = this.endY;
			}
		}
	},
	play: function (checkTouch) {
		if ($.clickMedia.media) {
			if (checkTouch) {
				if (Math.abs(this.startX - this.endX) < 10 && Math.abs(this.startY - this.endY) < 10) {
					this._play();
				}
			} else {
				this._play();
			}
		}
	}
});
