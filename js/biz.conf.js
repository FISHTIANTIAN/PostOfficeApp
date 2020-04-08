var biz = window.biz || {

	ajaxError: function () {
		$.alert.toast('操作失败，请稍后再试！');
	},

	server: {
		ENV: "LIVE", // DEV,LIVE
		_flag: function () {
			return $.inArray(this.ENV, ['LIVE']) ? 'REMOTE' : this.ENV;
		},
		baseUrl: {
			LIVE: "http://47.94.36.87:8886",
			REMOTE : "assets/json"
		},

		login:{
			LIVE:"/bizLogin/login"
		},

		schoolRequst: {
			LIVE: "",
			REMOTE : "/school/school.json"
		},

		announcementReuqst: {
			LIVE: "",
			REMOTE : "/school/announcement.json"
		},

		areaServicesReuqst: {
			LIVE: "",
			REMOTE : "/school/areaServices.json"
		},

		ristrictReuqst: {
			LIVE: "",
			REMOTE : "/ristrict/ristrict.json"
		},

		historyReuqst: {
			LIVE: "",
			REMOTE : "/my/history.json"
		},

		_evnUrl: function(type) {
			return this[type];
		},

		getApi:function(type){
			return  this.baseUrl[this._flag()] + this._evnUrl(type)[this._flag()];
		},

		getLoginUrl: function(){
			return this.baseUrl.LIVE + this.login.LIVE;
		}
	}
};

