const CACHE_VERSION = 1;

self.addEventListener("error", function(e) {
	self.clients.matchAll().then(function(clients) {
		if (clients && clients.length) {
			clients[0].postMessage({
				type: "ERROR",
				msg: e.message || null,
				stack: e.error ? e.error.stack : null
			});
		}
	});
});

self.addEventListener("unhandledrejection", function(e) {
	self.clients.matchAll().then(function(clients) {
		if (clients && clients.length) {
			clients[0].postMessage({
				type: "REJECTION",
				msg: e.reason ? e.reason.message : null,
				stack: e.reason ? e.reason.stack : null
			});
		}
	});
});

importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

workbox.setConfig({
	debug: true
});
workbox.core.setCacheNameDetails({
	prefix: "hima",
	suffix: "v" + CACHE_VERSION,
	precache: "precache", // 不设置的话默认值为 'precache'
	runtime: "runtime" // 不设置的话默认值为 'runtime'
});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([
	// 注册成功后要立即缓存的资源列表
	// {
	// 	url: './index.html',
	// 	revision: CACHE_VERSION
	// },
	// {
	// 	url: './css/ui.css',
	// 	revision: CACHE_VERSION
	// },
	{
		url: "./js/all.min.js",
		revision: CACHE_VERSION
	},
	{
		url: "./css/animate.css",
		revision: CACHE_VERSION
	},
	"./assets/audio/button_click.wav",
	"./assets/audio/slide.wav"
]);

// html的缓存策略
// workbox.routing.registerRoute(
// 	new RegExp('.*\.html'),
// 	workbox.strategies.networkFirst()
// );

workbox.routing.registerRoute(
	new RegExp(".*.(?:js|css)"),
	workbox.strategies.staleWhileRevalidate({
		cacheName: "hima:static",
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 20
			})
		]
	})
);

workbox.routing.registerRoute(
	/.*\.(?:png|jpg|jpeg|svg|gif)/g,
	workbox.strategies.cacheFirst({
		cacheName: "hima:img",
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			}),
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 12 * 60 * 60
			})
		]
	})
);

workbox.routing.registerRoute(
	new RegExp("https://hima-cdn.innodev.com.cn/"),
	workbox.strategies.cacheFirst({
		cacheName: "hima-cdn:static",
		plugins: [
			// 这个插件是让匹配的请求的符合开发者指定的条件的返回结果可以被缓存
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			}),
			new workbox.expiration.Plugin({
				maxEntries: 10, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
				maxAgeSeconds: 30 * 24 * 60 * 60 // 这只最长缓存时间为 30 天
			})
		]
	})
);

