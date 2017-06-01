ocx = {};
ocx.OCXObjects = {};
ocx.defaultOptions = {
	element: null,
	divid: '',
	width: '0',
	height: '0'
		//hasControl:false,
		//hasFullBtn:false
};
ocx.pushEvent = {
	LOGINFAIL: 2,
	USERONLINE: 21,
	GROUPUPDATEINFO: 22,
	CALLING_ERROR: 32,
	REQ_MUL_CALL_INFO: 37,
	REQ_NEWMESSAGE: 39,
	CHANNELUP: 43,
	CHANNELDOWN: 44,
	CHANNELUPDATE: 45,
	REQ_RECORDVOICEPATH: 50,
	CONTROLCALLSTATE_NOTIFY: 52,
	REQ_VIDEOSTATE: 54,
	WM_CALLSTATE_ERROR: 56,
	A1: 561,
	A2: 562,
	REQ_MUL_CALL_UPDATE: 57,
	WM_ALARM: 58,
	REQ_VIDEOSHARE: 59,
	REQ_MEDIADEVICE_VOIP: 63
}
ocx.callbackEvent = {
		//	1,
		//	23,
		//	24,
		//	25,
		//	31,
		//	35,
		//	36,
		//	34,
		//	42,
		//	51,
		//	64,
		//	65,
		//	53,
		//	47,
		//	48,
		//	49,
		//	60,
		REQ_CALLRESULT_VOIP: 620
			//	33,
			//	40
			//	
	}
//==========================================VOIP音视频会议===============================
ocx.MEETING = function(options){
	options.ocxid = "CPTTActivexMeetingCtrl";
	options.classid = "clsid:A0036968-06A0-4BB6-9E13-F2B8C59EE8CA";
	this._ocxObject = null; //object元素对象
	this._eleObject = null; //界面元素保存对象
    this._meetingAttributes = {};
    
	this.options = $.extend(ocx.defaultOptions, options); //属性继承
	var divObj = null;
	if(this.options.element != null && this.options.element != '') {
		divObj = this.options.element;
	}
	if(this.options.divid != null && this.options.divid != '') {
		divObj = document.getElementById(this.options.divid);
	}
	if(divObj != null) {
		this._eleObject = divObj;
		this.__initHtml(); //初始化界面元素
		this._ocxObject = document.getElementById(this.options.ocxid);
	}
}
ocx.MEETING.prototype = {
	__initHtml: function() {
		var temp = [];
		temp.push('<object id=\"' + this.options.ocxid + '\" classid=\"' + this.options.classid + '\" width="' + this.options.width + '" height="' + this.options.height + '" >');
		temp.push('</object>');
		$(this._eleObject).html(temp.join(""));
	},
	setMeetingAttribute: function(key, value) {
		this._meetingAttributes[key] = value;
	},
	getMeetingAttribute: function(key) {
		return this._meetingAttributes[key];
	}
}
	//=======================================VOIP语音、视频电话控件================================
ocx.VOIPNETCALL = function(options) {
	options.ocxid = "CPTTActivexOwnVideoCtrl";
	options.classid = "clsid:56a8a0ba-47ad-45db-9d06-e2cac9664b1a";
	this._ocxObject = null; //object元素对象
	this._eleObject = null; //界面元素保存对象

    this._attributes = {}; //记录视频监控的相关属性
	this.options = $.extend(ocx.defaultOptions, options); //属性继承
	var divObj = null;
	if(this.options.element != null && this.options.element != '') {
		divObj = this.options.element;
	}
	if(this.options.divid != null && this.options.divid != '') {
		divObj = document.getElementById(this.options.divid);
	}
	if(divObj != null) {
		this._eleObject = divObj;
		this.__initHtml(); //初始化界面元素
		this._ocxObject = document.getElementById(this.options.ocxid);
	}
}
ocx.VOIPNETCALL.prototype = {
		__initHtml: function() {
			var temp = [];
			temp.push('<object id=\"' + this.options.ocxid + '\" classid=\"' + this.options.classid + '\" width="' + this.options.width + '" height="' + this.options.height + '" >');
			temp.push('</object>');
			$(this._eleObject).html(temp.join(""));
			//	   alert($(this._eleObject).html());
		},
		setNetcallAttribute: function(key, value) {
			this._attributes[key] = value;
		},
		getNetcallAttribute: function(key) {
			return this._attributes[key];
		}
	}
	//=======================================视频监控控件初始化======================================
ocx.VOIPVIDEO = function(options) {
	options.ocxid = "CPTTActivexVideoCtrl1";
	options.classid = "clsid:6c9b9e09-d8c4-4631-a1c2-a4e0e2b45c72";
	this._ocxObject = null; //object元素对象
	this._eleObject = null; //界面元素保存对象

	this._activexID = null; //视频窗口的唯一标识

	this._attributes = {}; //记录视频监控的相关属性

	this.options = $.extend(ocx.defaultOptions, options); //属性继承
	var divObj = null;
	if(this.options.element != null && this.options.element != '') {
		divObj = this.options.element;
	}
	if(this.options.divid != null && this.options.divid != '') {
		divObj = document.getElementById(this.options.divid);
	}
	if(divObj != null) {
		this._eleObject = divObj;
		this.__initHtml(); //初始化界面元素
		this._ocxObject = document.getElementById(this.options.ocxid);
	}
}
ocx.VOIPVIDEO.prototype = {
		__initHtml: function() {
			var temp = [];
			temp.push('<object id=\"' + this.options.ocxid + '\" classid=\"' + this.options.classid + '\" width="' + this.options.width + '" height="' + this.options.height + '" >');
			temp.push('</object>');
			$(this._eleObject).html(temp.join(""));
		},
		SetActivexID: function(id) {
			if(this._ocxObject) {
				this._activexID = id;
				return this._ocxObject.SetActivexID(id);
			}
			return false;
		},
		setVideoAttribute: function(key, value) {
			this._attributes[key] = value;
		},
		getVideoAttribute: function(key) {
			return this._attributes[key];
		}
	}
	//=======================================登录界面获取版本号的控件===============================
ocx.PTTCONTROLVERSION = function(options) {
	options.ocxid = "PTTControlGetServer";
	options.classid = "clsid:2f9068ec-732f-4dde-af12-bfa38cd0021b";
	
	this._ocxObject = null; //object元素对象
	this._eleObject = null; //界面元素保存对象

	this.options = $.extend(ocx.defaultOptions, options); //属性继承
	var divObj = null;
	if(this.options.element != null && this.options.element != '') {
		divObj = this.options.element;
	}
	if(this.options.divid != null && this.options.divid != '') {
		divObj = document.getElementById(this.options.divid);
	}
	if(divObj != null) {
		this._eleObject = divObj;
		this.__initHtml(); //初始化界面元素
		this._ocxObject = document.getElementById(this.options.ocxid);
	}
}
ocx.PTTCONTROLVERSION.prototype = {
		__initHtml: function() {
			var temp = [];
			temp.push('<object id=\"' + this.options.ocxid + '\" classid=\"' + this.options.classid + '\" width="' + this.options.width + '" height="' + this.options.height + '" >');
			temp.push('</object>');
			$(this._eleObject).html(temp.join(""));
		},
		GetVersion: function() {
			if(this._ocxObject) {
				return this._ocxObject.GetVersion();
			}
			return '';
		}
	}
	//====================================PTTControl信令插件================================
ocx.PTTCONTROL = function(options) {
	options.ocxid = "PTTControlActiveCtrl";
	options.classid = "clsid:C6900E32-F08E-4994-BB94-368B896F0C51";
	
	this._ocxObject = null; //object元素对象
	this._eleObject = null; //界面元素保存对象
	this._responseCallback = {}; //异步请求的反馈函数集合
	this._autoCallback = {}; //服务器端自动返回的事件集合

	this._voipState = null; //VOIP的全局状态
	this._urlVideo = "js/voipVideo.html"; //视频窗口URL
	this._calledvideo = null; //被叫窗口对象
	this.options = $.extend(ocx.defaultOptions, options); //属性继承
	var divObj = null;
	if(this.options.element != null && this.options.element != '') {
		divObj = this.options.element;
	}
	if(this.options.divid != null && this.options.divid != '') {
		divObj = document.getElementById(this.options.divid);
	}
	if(divObj != null) {
		this._eleObject = divObj;
		this.__initHtml(); //初始化界面元素
		this._ocxObject = document.getElementById(this.options.ocxid);
		if(this._ocxObject) {
			logInfo("界面元素初始化成功");
		} else {
			logInfo("界面元素初始化失败");
		}

		this.__initResponseCallback(); //初始化请求反馈函数
		this.__initAutoCallback(); //初始化自动注册函数
		this.__initVoipOperation(); //初始化voip返回的函数对应关系

	}
}
ocx.PTTCONTROL.prototype = {
	//初始化html元素的插件对象
	__initHtml: function() {
		var temp = [];
		temp.push('<object id=\"' + this.options.ocxid + '\" classid=\"' + this.options.classid + '\" width="' + this.options.width + '" height="' + this.options.height + '" >');
		temp.push('</object>');
		$(this._eleObject).html(temp.join(""));
	},
	__initResponseCallback: function() {
		if(this._ocxObject && this._ocxObject.attachEvent) {
			var that = this;
			this._ocxObject.attachEvent("OnRecvCallBackEvent", function(str) {
				console.log('responeCallback=' + str);
				eval("strJson = {" + str + "};"); //此处需要将其转化为js对象，获取nType类型
				//此处需要解析str返回值，根据nType来调用对应的方法type替换为变量str.nType
				that.__ocxResponseCallBack(strJson.nType, str);
			});
		}
	},
	__initAutoCallback: function() {
		if(this._ocxObject && this._ocxObject.attachEvent) {
			var that = this;
			this._ocxObject.attachEvent('OnRecvPushEvent', function(str) {
				console.log('autoCallback=' + str);
				eval("strJson = {" + str + "};"); //此处需要将其转化为js对象，获取nType类型
				//此处需要解析str返回值，根据nType来调用对应的方法
				that.__ocxAutoCallBack(strJson.nType, str);

			});
		}
	},
	addEventListener: function(type, func) {
		this._autoCallback[ocx.pushEvent[type]] = func;
	},
	removeEventListener: function(type) {
		delete this._autoCallback[ocx.pushEvent[type]];
	},
	addCallBackEventListener: function(type, func) {
		this._responseCallback[ocx.callbackEvent[type]] = func;
	},
	removeCallBackEventListener: function(type) {
		delete this._responseCallback[ocx.callbackEvent[type]];
	},
	__ocxAutoCallBack: function(type, str) {
		if(this._ocxObject) {
			if(this._autoCallback[type]) {
				this._autoCallback[type].call(this, str);
			}
		}
	},
	__ocxResponseCallBack: function(type, str) {
		if(this._ocxObject) {
			var that = this;
			if(this._responseCallback[type]) {
				setTimeout(function() {
					that._responseCallback[type].call(that, str);
				}, 20);

			}
		}
	},
	Login: function(UserName, UserID, UserPWD, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[1] = func; //此处需要注册对应的回调函数，注意是以数字区分还是以简码区分
			}
			var result = this._ocxObject.LogIn(UserName, UserID, UserPWD, this.options.ServerIP, this.options.ServerPort);
			if(result) {
				logInfo("请求登录成功，等待服务器返回...");
			} else {
				logInfo("请求登录失败，请查看服务器是否宕机");
			}
		}
		return result;
	},
	GetVersion: function() { //data:参数集合，必须注意参数的顺序；func：注册成功后的回调方法
		if(this._ocxObject) {
			return this._ocxObject.GetVersion();
		}
		return '';
	},
	ClosePTTCenter: function() {
		if(this._ocxObject) {
			return this._ocxObject.ClosePTTCenter();
		}
		return false;
	},
	CreateTempGroup: function(groupName, groupUserNum, groupMember, groupType, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[23] = func; //此处需要注册对应的回调函数，注意是以数字区分还是以简码区分
			}
			return this._ocxObject.CreateTempGroup(groupName, groupUserNum, groupMember, groupType);
		}
		return false;
	},
	ModifyTempGroup: function(oldGroupName, newGroupName, addUserMember, delUserMember, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[24] = func; //此处需要注册对应的回调函数，注意是以数字区分还是以简码区分
			}
			return this._ocxObject.ModifyTempGroup(oldGroupName, newGroupName, addUserMember, delUserMember);
		}
		return false;
	},
	DeleteTempGroup: function(groupName, groupId, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[25] = func; //此处需要注册对应的回调函数，注意是以数字区分还是以简码区分
			}
			return this._ocxObject.DeleteTempGroup(groupName, groupId);
		}
		return false;
	},
	RequestCall: function(groupId, userId, type, userNum, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[31] = func; //此处需要注册对应的回调函数，注意是以数字区分还是以简码区分
			}
			return this._ocxObject.RequestCall(groupId, userId, type, userNum);
		}
		return false;
	},
	ReleaseCall: function() {
		if(this._ocxObject) {
			return this._ocxObject.ReleaseCall();
		}
		return false;
	},
	CallCollocation: function(groupId, strType, createUserId, ownGroupType, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[35] = func; //此处需要注册对应的回调函数，注意是以数字区分还是以简码区分
			}
			return this._ocxObject.CallCollocation(groupId, strType, createUserId, ownGroupType);
		}
		return false;
	},
	ReleaseCollocation: function(groupId, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[36] = func;
			}
			return this._ocxObject.ReleaseCollocation(groupId);
		}
		return false;
	},
	UserActive: function(userId, func) {
		if(this._ocxObject) {
			if(func) {
				alert(userId);
				this._responseCallback[34] = func;
			}
			return this._ocxObject.UserActive(userId);
		}
		return false;
	},
	DisableUser: function(strType, userId, func) {
		if(this._ocxObject) {
			if(func) {
				if(strType == 0) {
					this._responseCallback[42] = func;
				} else if(strType == 1) {
					this._responseCallback[51] = func;
				}

			}
			return this._ocxObject.DisableUser(strType, userId);
		}
		return false;
	},
	KillorGAGUser: function(operationType, userType, strId, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[64] = func;
			}
			return this._ocxObject.KillorGAGUser(operationType, userType, strId);
		}
		return false;
	},
	ReleaseKillorGAGUser: function(operationType, userType, strId, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[65] = func;
			}
			return this._ocxObject.ReleaseKillorGAGUser(operationType, userType, strId);
		}
		return false;
	},
	/**
	 * 
	 * @param {Object} strType(0：开始录音，1：发送录音，2：停止录音)
	 * @param {Object} func
	 */
	RecordVoice: function(strType, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[50] = func;
			}
			return this._ocxObject.RecordVoice(strType);
		}
		return false;
	},
	UpLoadVoiceMsg: function(strURL, strPath, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[53] = func;
			}
			return this._ocxObject.UpLoadVoiceMsg(strURL, strPath);
		}
		return false;
	},
	MonitorChannel: function(strType, strChannelType, strChannelID, strCallID,strCalledID, func) {
		if(this._ocxObject) {
			if(func) {
				if(strType == 0) {
					this._responseCallback[47] = func;
				} else if(strType == 1) {
					this._responseCallback[48] = func;
				}

			}
			return this._ocxObject.MonitorChannel(strType, strChannelType, strChannelID, strCallID,strCalledID);
		}
		return false;
	},
	RemoveChannel: function(strChannelID, strCallID, strCalledID, strGroupID, strCallServerID, strState, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[49] = func;
			}
			return this._ocxObject.RemoveChannel(strChannelID, strCallID, strCalledID, strGroupID, strCallServerID, strState);
		}
		return false;
	},
	OpenGPS: function(strType, strUserId, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[40] = func;
			}
			return this._ocxObject.OpenGPS(strType, strUserId);
		}
		return false;
	},
	LoginToVoip: function(strRemoteHost, strRemotePort, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[60] = func;
			}
			return this._ocxObject.LoginToVoip(strRemoteHost, strRemotePort);
		}
		return false;
	},
	Call_Voip: function(strType, strLocalID, strRemoteID, func) {
		if(this._ocxObject) {
			if(func) {
				this._voipState = "Call_Voip";
				this._responseCallback[610] = func;
			}
			return this._ocxObject.Call_Voip(strType, strLocalID, strRemoteID);
		}
		return false;
	},
	Answer_Voip: function(strType, strLocalID, strRemoteID, strMediaType, func) {
		if(this._ocxObject) {
			if(func) {
				this._voipState = "Answer_Voip";
				this._responseCallback[612] = func;
			}
			return this._ocxObject.Answer_Voip(strType, strLocalID, strRemoteID, strMediaType);
		}
		return false;
	},
	Reject_Voip: function(strLocalID, strRemoteID, func) {
		if(this._ocxObject) {
			if(func) {
				this._voipState = "Reject_Voip";
				this._responseCallback[611] = func;
			}
			return this._ocxObject.Reject_Voip(strLocalID, strRemoteID);
		}
		return false;
	},
	OpenVideo_Voip: function(strLocalID, strRemoteID, strType, strID, func) {
		if(this._ocxObject) {
			if(func) {
				if(strType==0){//打开VOIP
					this._voipState = "OpenVideo_Voip_Open";
					this._responseCallback[615] = func;
				}else if(strType==1){//关闭
					this._voipState = "OpenVideo_Voip_Close";
					this._responseCallback[616] = func;
				}
				
			}
			return this._ocxObject.OpenVideo_Voip(strLocalID, strRemoteID, strType, strID);
		}
		return false;
	},
	OpenVideo: function(strType, strUserId, func) {
		if(this._ocxObject) {
			if(func) {
				this._responseCallback[33] = func;
			}
			return this._ocxObject.OpenVideo(strType, strUserId);
		}
		return false;
	},
	InitMettingInfo:function(strRemoteID,strPort){
		if(this._ocxObject) {
			return this._ocxObject.InitMettingInfo(strRemoteID,strPort);
		}
		return false;
	},
	CreateMettingRoom:function(strMettingType,strConferenceTheme,strVideoCompType,strVideoSize){
		if(this._ocxObject) {
			return this._ocxObject.CreateMettingRoom(strMettingType,strConferenceTheme,strVideoCompType,strVideoSize);
		}
		return false;
	},
	CallMeeting_Voip: function(strMettingType,strLocalID, strMeetRoomID,strMettingMemberID) {
		if(this._ocxObject) {
			return this._ocxObject.CallMeeting_Voip(strMettingType,strLocalID, strMeetRoomID,strMettingMemberID);
		}
		return false;
	},
	JoinMeeting_Voip:function(strLocalID, strRemoteID, strMediaType, func) {
		if(this._ocxObject) {
			if(func) {
				this._voipState = "CallMeeting_Voip";
				this._responseCallback[613] = func;
			}
			return this._ocxObject.JoinMeeting_Voip(strMediaType,strLocalID, strRemoteID);
		}
		return false;
	},
	ExitMeeting_Voip: function(strLocalID, strRemoteID, func) {
		if(this._ocxObject) {
			if(func) {
				this._voipState = "ExitMeeting_Voip";
				this._responseCallback[614] = func;
			}
			return this._ocxObject.ExitMeeting_Voip(strLocalID, strRemoteID);
		}
		return false;
	},
	OpenCamera_Voip: function(strLocalID, strRemoteID, strType, strID,func) {
		if(this._ocxObject) {
			if(func){
				this._voipState = "OpenCamera_Voip";
				this._responseCallback[617] = func;
			}
			return this._ocxObject.OpenCamera_Voip(strLocalID, strRemoteID, strType, strID);
		}
		return false;
	},
	Screenshot: function() {
		if(this._ocxObject) {
			return this._ocxObject.Screenshot();
		}
		return false;
	},
	ForwardVideo: function(strUserID, strSharedUserID, strShareNum, strShareUserID) {
		if(this._ocxObject) {
			return this._ocxObject.ForwardVideo(strUserID, strSharedUserID, strShareNum, strShareUserID);
		}
		return false;
	},
	SetCallCodecType: function(strCodecType) {
		if(this._ocxObject) {
			return this._ocxObject.SetCallCodecType(strCodecType);
		}
		return false;
	},
	DealAlarmInfo: function(strUserId, strAlarmTime, strAlarmInfo) {
		if(this._ocxObject) {
			return this._ocxObject.DealAlarmInfo(strUserId, strAlarmTime, strAlarmInfo);
		}
		return false;
	},
	GetCurrentCall: function() {
		if(this._ocxObject) {
			return this._ocxObject.GetCurrentCall();
		}
		return '';
	},
	StopHistoryMsgVoice: function() {
		if(this._ocxObject) {
			return this._ocxObject.StopHistoryMsgVoice();
		}
		return false;
	},
	DefListen: function(strType, strListenType, listenID) {
		if(this._ocxObject) {
			return this._ocxObject.DefListen(strType, strListenType, listenID);
		}
		return false;
	},
	StopVoice: function(strType) {
		if(this._ocxObject) {
			return this._ocxObject.StopVoice(strType);
		}
		return false;
	},
	/**
	 * 
	 * @param {Object} strType 0：消息；2：历史
	 * @param {Object} strDataURL  web提供的一个返回视频流的链接地址
	 */
	PlayVoice: function(strType, strDataURL) {
		if(this._ocxObject) {
			return this._ocxObject.PlayVoice(strType, strDataURL);
		}
		return false;
	},
	DestoryUser: function(userId) { //没有回调函数
		if(this._ocxObject) {
			return this._ocxObject.DestoryUser(userId);
		}
		return false;
	},
	__initVoipOperation: function() {
		if(this._ocxObject) {
			var that = this;
			this._responseCallback[61] = function(str) {
				eval("strJson = {" + str + "};");
				var method = that._voipState;
				if(method) {
					if(method == "Call_Voip") {
						that.__ocxResponseCallBack(610, str);
					} else if(method == "Reject_Voip") {
						that.__ocxResponseCallBack(611, str);
					} else if(method == "Answer_Voip") {
						that.__ocxResponseCallBack(612, str);
					} else if(method == "CallMeeting_Voip") {
						that.__ocxResponseCallBack(613, str);
					} else if(method == "ExitMeeting_Voip") {
						that.__ocxResponseCallBack(614, str);
					} else if(method == "OpenVideo_Voip_Open") {
						that.__ocxResponseCallBack(615, str);
					} else if(method == "OpenVideo_Voip_Close") {
						that.__ocxResponseCallBack(616, str);
					} else if(method == "OpenCamera_Voip"){
						that.__ocxResponseCallBack(617, str);
					}
				} else {
					if(strJson.nState == 2) {
						that.__ocxResponseCallBack(620, str);
					}
				}
			};
		}
	},
	setVoipState: function(state) { //设置VOIP状态
		this._voipState = state;
	},
	getVoipState: function() {
		return this._voipState;
	},
	openVideoWin: function() {
		this._calledvideo = window.open(this._urlVideo, "", "height=300, width=500, center=no, scrollbars=no, resizable=no,menubar=no");
	},
	closeVideoWin: function() {
		var that = this;
		if(that._calledvideo) {
			setTimeout(function() {
				that._calledvideo.close();
				that._calledvideo = undefined;
			}, 50);
		}
	}
}

function logInfo(txtInfo) {
	var ConInfoText = document.getElementById("resultInfo");
	ConInfoText.innerText = ConInfoText.innerText + "\n" + txtInfo + "";
}