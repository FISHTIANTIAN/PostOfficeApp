$.astra = {
	ws: null,
	online: false,
	init: function (options) {
		if (!this.isSupported()) {
			console.error('Not support websocket');
			return;
		}

		var op = $.extend({
			onopen: function () {
			},
			onmessage: function () {
			},
			onclose: function () {
			},
			host: null
		}, options);

		if (!op.host) {
			console.error("初始化WebSocket失败，无效的请求地址");
			return;
		}

		this.ws = new WebSocket(op.host);
		//连接发生错误的回调方法
		this.ws.onerror = function () {
			console.log("与服务器连接失败...");
		};

		//连接成功建立的回调方法
		this.ws.onopen = function (event) {
			console.log("与服务器连接成功...");
			$.astra.online = true;
			if (op.onopen) {
				op.onopen(event);
			}
		}

		//接收到消息的回调方法
		this.ws.onmessage = function (event) {
			// console.log("接收到服务器端推送的消息：" + event.data);
			if (op.onmessage) {
				op.onmessage(event);
			}
		}

		//连接关闭的回调方法
		this.ws.onclose = function (event) {
			console.log("关闭连接...");
			$.astra.online = false;
			if (op.onclose) {
				op.onclose(event);
			}
		}
	},

	isSupported: function () {
		return 'WebSocket' in window;
	},
	close: function () {
		$.astra.online = false;
		if (!this.ws) {
			return;
		}
		this.ws.close();
		this.ws = null;
	}
};
