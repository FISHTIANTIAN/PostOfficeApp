(function ($) {
    $.extend({
        websocket: {
            _this: null,
            _initialized: false,
            init: function (options) {
                if (!this.isSupported()) {
                    console.error('Not support websocket');
                    return;
                }
                var op = $.extend({
                    callback: function(){},
                    host: null,
                    reconnect: false
                }, options);
                if (!op.host) {
                    console.error("初始化WebSocket失败，无效的请求地址");
                    return;
                }
                this._this = new WebSocket(op.host);
                this._initialized = true;
                //连接发生错误的回调方法
                this._this.onerror = function () {
                    // console.log("与服务器连接失败...");
                };

                //连接成功建立的回调方法
                this._this.onopen = function (event) {
                    // console.log("与服务器连接成功...");
                }

                //接收到消息的回调方法
                this._this.onmessage = function (event) {
                    // dwz.notification.show({notification: event.data});
                    op.callback(event.data);
                    // console.log("接收到服务器端推送的消息：" + event.data);
                }

                //连接关闭的回调方法
                this._this.onclose = function () {
                    $.websocket._initialized = false;
                    // console.log("已关闭当前链接");
                    if (op.reconnect ) {
                        // 自动重连
                        setTimeout(function () {
                            $.websocket.open(op);
                        }, 5000);
                    }
                }
            },
            open: function (options) {
                var op = $.extend({
                    callback: function(){},
                    host: null,
                    reconnect: false
                }, options);

                if(this._initialized){
                    this.close();
                }
                this.init(options);
                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = function () {
                    // console.log("窗口关闭了");
                    $.websocket.close();
                }
            },
            isSupported: function () {
                return 'WebSocket' in window;
            },
            send: function (message) {
                if (!this._this) {
                    return;
                }
                this._this.send(message);
            },
            close: function () {
                if (!this._this) {
                    return;
                }
                this._this.close();
            }
        }
    });
})(dwz);