(function (console, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EntryPoint = function() { };
EntryPoint.__name__ = true;
EntryPoint.main = function() {
	haxe_Log.trace(EntryPoint.main,{ fileName : "EntryPoint.hx", lineNumber : 10, className : "EntryPoint", methodName : "main", customParams : [EntryPoint.main]});
	new Main();
};
var Main = function() {
	this.mainViewModel = new view_data_MainViewModel();
	var mainView = new view_MainView(this.mainViewModel);
	var namesListLoader = new external_DataLoader();
	namesListLoader.addEventListener("onLoad",$bind(this,this.onNamesListLoaded));
	namesListLoader.load("usersList.txt");
	new chatManagment_ChatController(this.mainViewModel);
};
Main.__name__ = true;
Main.prototype = {
	onNamesListLoaded: function(e) {
		var namesList = e.data.split("\r\n");
		namesList.unshift("Вы");
		this.mainViewModel.addUsers(namesList);
	}
	,__class__: Main
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var chatManagment_ChatController = function(viewModel) {
	this.chatEvents = [];
	this.viewModel = viewModel;
	this.initialize();
};
chatManagment_ChatController.__name__ = true;
chatManagment_ChatController.prototype = {
	initialize: function() {
		var dataLoader = new external_DataLoader();
		dataLoader.addEventListener("onLoad",$bind(this,this.onDataLoaded));
		dataLoader.load("chat.txt");
		var timer = new haxe_Timer(1000);
		timer.run = $bind(this,this.onUpdate);
	}
	,onUpdate: function() {
		if(this.chatEvents.length > 0) {
			var currentMessage = this.chatEvents[0];
			if(currentMessage.time < new Date().getTime()) {
				this.viewModel.addMessage(currentMessage.name + ": " + currentMessage.message);
				this.chatEvents.shift();
			}
		}
	}
	,onDataLoaded: function(e) {
		var chatData = e.data;
		var chatMessages;
		if(chatData.indexOf("\r\n") != -1) chatMessages = chatData.split("\r\n"); else chatMessages = chatData.split("\n");
		var _g = 0;
		while(_g < chatMessages.length) {
			var chatMessage = chatMessages[_g];
			++_g;
			var chatMessageParts = chatMessage.split("\t");
			var time = chatMessageParts[0];
			var name = chatMessageParts[1];
			var message = chatMessageParts[2];
			this.chatEvents.push(new chatManagment_ChatEventMessage(new Date().getTime() + parseFloat(time) * 1000,name,message));
		}
	}
	,sortOnTime: function(x,y) {
		if(x.time > y.time) return 1; else if(x.time < y.time) return -1; else return 0;
	}
	,__class__: chatManagment_ChatController
};
var chatManagment_ChatEventMessage = function(time,name,message) {
	this.message = message;
	this.name = name;
	this.time = time;
};
chatManagment_ChatEventMessage.__name__ = true;
chatManagment_ChatEventMessage.prototype = {
	toString: function() {
		return "[ChatEventMessage time=" + this.time + " name=" + this.name + " message=" + this.message + "]";
	}
	,__class__: chatManagment_ChatEventMessage
};
var events_Event = function(type) {
	this.type = type;
};
events_Event.__name__ = true;
events_Event.prototype = {
	__class__: events_Event
};
var events_DataEvent = function(type,data) {
	events_Event.call(this,type);
	this.data = data;
};
events_DataEvent.__name__ = true;
events_DataEvent.__super__ = events_Event;
events_DataEvent.prototype = $extend(events_Event.prototype,{
	__class__: events_DataEvent
});
var events_Observer = function() {
	this.describes = new haxe_ds_StringMap();
};
events_Observer.__name__ = true;
events_Observer.prototype = {
	addEventListener: function(type,callback) {
		var callbackList = this.describes.get(type);
		if(callbackList == null) {
			callbackList = [];
			{
				this.describes.set(type,callbackList);
				callbackList;
			}
		}
		callbackList.push(callback);
	}
	,dispatchEvent: function(event) {
		var callbackList = this.describes.get(event.type);
		if(callbackList != null) {
			var _g = 0;
			while(_g < callbackList.length) {
				var callback = callbackList[_g];
				++_g;
				callback(event);
			}
		}
	}
	,__class__: events_Observer
};
var external_DataLoader = function() {
	events_Observer.call(this);
	this.httpRequest = js_Browser.createXMLHttpRequest();
	this.httpRequest.onload = $bind(this,this.onLoadComplete);
};
external_DataLoader.__name__ = true;
external_DataLoader.__super__ = events_Observer;
external_DataLoader.prototype = $extend(events_Observer.prototype,{
	load: function(path) {
		this.httpRequest.open("GET",path,true);
		this.httpRequest.send();
	}
	,onLoadComplete: function() {
		var data = this.httpRequest.responseText;
		this.dispatchEvent(new events_DataEvent("onLoad",data));
	}
	,__class__: external_DataLoader
});
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.prototype = {
	run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var view_MainView = function(viewModel) {
	this.usersCount = 0;
	this.viewModel = viewModel;
	this.initialize();
};
view_MainView.__name__ = true;
view_MainView.prototype = {
	initialize: function() {
		this.buildUi();
		this.userlistBlockHeaderPattern = this.usersListHeader.innerText;
		this.chatTextInput.addEventListener("keyup",$bind(this,this.onInputKeyPress));
		this.viewModel.addEventListener("userListChange",$bind(this,this.updateUsersList));
		this.viewModel.addEventListener("messageAdd",$bind(this,this.updateMessagesLists));
		new haxe_Timer(1000).run = $bind(this,this.onUsersCountUpdate);
	}
	,onUsersCountUpdate: function() {
		this.usersCount += Std["int"](Math.random() * 3);
		this.usersListHeader.innerText = this.userlistBlockHeaderPattern.split("{0}").join(Std.string(this.usersCount));
	}
	,buildUi: function() {
		this.usersList = window.document.getElementById("users");
		this.usersListHeader = window.document.getElementById("usersHeader");
		this.chatMessages = window.document.getElementById("chat");
		this.chatTextInput = js_Boot.__cast(window.document.getElementById("chatInput") , HTMLInputElement);
	}
	,onInputKeyPress: function(event) {
		event.preventDefault();
		if(event.keyCode == 13) {
			this.viewModel.addMessage("Вы: " + this.chatTextInput.value);
			this.chatTextInput.value = "";
		}
	}
	,updateMessagesLists: function(e) {
		this.chatMessages.innerText = this.viewModel.messages.join("\n");
	}
	,updateUsersList: function(e) {
		this.usersList.innerText = this.viewModel.usersList.join("\n");
		this.usersCount += this.viewModel.usersList.length;
	}
	,__class__: view_MainView
};
var view_data_MainViewModel = function() {
	this.inputText = "";
	this.messages = [];
	this.usersList = [];
	events_Observer.call(this);
};
view_data_MainViewModel.__name__ = true;
view_data_MainViewModel.__super__ = events_Observer;
view_data_MainViewModel.prototype = $extend(events_Observer.prototype,{
	addUsers: function(users) {
		var _g = 0;
		while(_g < users.length) {
			var user = users[_g];
			++_g;
			this.usersList.push(user);
		}
		this.dispatchEvent(new view_events_UserListEvent("userListChange"));
	}
	,addUser: function(user) {
		this.usersList.push(user);
		this.dispatchEvent(new view_events_UserListEvent("userListChange"));
	}
	,addMessage: function(message) {
		var date = new Date();
		this.messages.push(message + " " + date.getHours() + ":" + this.formatMinutes(date.getMinutes()));
		this.dispatchEvent(new view_events_ChatEvent("messageAdd"));
	}
	,formatMinutes: function(minutes) {
		var minutesAsString;
		if(minutes == null) minutesAsString = "null"; else minutesAsString = "" + minutes;
		if(minutesAsString.length == 1) minutesAsString = "0" + minutesAsString;
		return minutesAsString;
	}
	,__class__: view_data_MainViewModel
});
var view_events_ChatEvent = function(type) {
	events_Event.call(this,type);
};
view_events_ChatEvent.__name__ = true;
view_events_ChatEvent.__super__ = events_Event;
view_events_ChatEvent.prototype = $extend(events_Event.prototype,{
	__class__: view_events_ChatEvent
});
var view_events_UserListEvent = function(type) {
	events_Event.call(this,type);
};
view_events_UserListEvent.__name__ = true;
view_events_UserListEvent.__super__ = events_Event;
view_events_UserListEvent.prototype = $extend(events_Event.prototype,{
	__class__: view_events_UserListEvent
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
events_DataEvent.ON_LOAD = "onLoad";
external_DataLoader.ON_LOAD = "onLoad";
js_Boot.__toStr = {}.toString;
view_events_ChatEvent.MESSAGE_ADD = "messageAdd";
view_events_UserListEvent.USER_LIST_CHANGE = "userListChange";
EntryPoint.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
