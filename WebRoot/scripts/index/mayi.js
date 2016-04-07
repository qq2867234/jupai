//$(document).ready(function(){
var MY = window.MY || {};
(function(){
//	http://analytics.ganji.com/p.gif?gjch=/duanzu/index&gc=/duanzu/-/-/-/index&uuid=6033834449077655455335&reqid=-&gjuser=-7449356661961093996&sid=41906139422&ca_source=bzclk.baidu.com&ca_name=se&ca_kw=mayiduanzu|utf8&ca_id=-&ca_s=tg_baidu&ca_n=pinzhuan_dz_bt&ca_i=ad&ifid=-&refer=http%3A%2F%2Fbzclk.baidu.com%2Fadrc.php%3Ft%3D0fKL00c00fAhekD0PIuc0jdXAsjBV17y00000DHkRHD00000X6_-P1.THLaePQ5V_1g36K85yF9pywd0ZnqmymLnvPBnhfsnj0snAwbr0Kd5Hn4wjmsf10vnHTsf1NDnbwjwjNDwD7jPRR4P1K7fRwK0ADqI1YhUyPGujYkrHnLnWcLrHTkFMKzUvwGujYkPBuEThbqniu1IyFEThbqFMKzpHYz0ARqpZwYTjCEQLILIz4Vmg-GQhPEUitOmv7xT1dYudqBmy-bIiuWmNq85gKGUMGCIy78gvwlgvFYFhP9gvbqmyf0mLFW5HRvP1nY%26ie%3Dutf-8%26f%3D8%26tn%3Dbaidu%26wd%3Dmayiduanzu%26inputT%3D3011&ua=os:windows|ov:6.1|bn:webkit|bv:537.36|dv:Win32|rl:1920,1080&fv=17.0.0&sc=1920,1080&landing=0&gjchver=A
//	http://analytics.mayi.com/p.gif?uuid=3850520979303498637593&t=2015-10-29%2002:08:48&userid=850296183&sid=-&ca_source=bzclk.baidu.com&ca_name=-&ca_kw=-&ca_id=-&ca_s=tg_baidu&ca_n=pinzhuan_dz_bt&ca_i=ad&refer=http%3A%2F%2Fbzclk.baidu.com%2Fadrc.php%3Ft%3D0fKL00c00fAhekD0PIuc0jdXAsjBV17y00000DHkRHD00000X6_-P1.THLaePQ5V_1g36K85yF9pywd0ZnqmymLnvPBnhfsnj0snAwbr0Kd5Hn4wjmsf10vnHTsf1NDnbwjwjNDwD7jPRR4P1K7fRwK0ADqI1YhUyPGujYkrHnLnWcLrHTkFMKzUvwGujYkPBuEThbqniu1IyFEThbqFMKzpHYz0ARqpZwYTjCEQLILIz4Vmg-GQhPEUitOmv7xT1dYudqBmy-bIiuWmNq85gKGUMGCIy78gvwlgvFYFhP9gvbqmyf0mLFW5HRvP1nY%26ie%3Dutf-8%26f%3D8%26tn%3Dbaidu%26wd%3Dmayiduanzu%26inputT%3D3011&fv=17.0.0&ua=os:windows,ov:6.1,bn:webkit,bv:537.36,dv:Win32,rl:1920,1080&version=537.36&swidth=1080&sheight=1920&b_source=-&bid=-&p_source=-&p_type=-&log_platform=web&page_type=index&url=http%3A%2F%2Fwww.mayi.com%2F%3Fca_s%3Dtg_baidu%26ca_n%3Dpinzhuan_dz_bt%26ca_i%3Dad
	var namespace= "mayi";
	MY.host="http://analytics.mayi.com";
	MY.img_file="p.gif";	
	MY.domain="analytics.mayi.com";
//	MY.cookieDomain="www.mayi.com";
//	MY.wapCookieDomain="m.mayi.com";
	MY.cookieDomain="mayi.com";
	MY.uuid="";
	MY.uuid_name="mayi_uuid";
	MY.document_refer="";
	MY.load_time=new Date();
	MY.last_pb_time=MY.load_time;
	MY.win=window;
	MY.nav=window.navigator;
	MY.ua_format;
	MY.p_source="-";
	MY.p_type="-";
	MY.p_time="-";
	MY.ext_1="-";
	MY.ext_2="-";
	MY.ext_3="-";
	MY.log_type=1;  9329304925275499935213
	MY.kw="";
	MY.cookieEnabled = MY.nav.cookieEnabled;
	MY.javaEnabled = MY.nav.javaEnabled();

	MY.getDocument_refer=function(){
		if (window.parent != window.self){
			try{
				MY.document_refer = parent.document.referrer;
			}catch(err) {
				MY.document_refer = document.referrer;
			}
		}else{
			MY.document_refer = document.referrer;
		}
//		console.log("MY.document_refer = "+MY.document_refer);
		MY.document_refer=MY._encodeURI(MY.document_refer);
		return MY.document_refer;
	}

	MY.getCookie=function(c_name)
	{
		var value = null,cookie;
		if (document.cookie) 
		{
			cookie = document.cookie.match(new RegExp("(^| )" + c_name + "=([^;]*)(;|$)"));
			if (cookie != null)
			{
				value = decodeURIComponent(cookie[2]);
			}
		}
		return value;
	}

	MY.setCookie=function(c_name,value,domain,path,exdays)
	{
		exdays = !MY.isNumber(exdays) ? 0 : parseInt(exdays); 
		var exdate=new Date();
		exdate.setTime(exdate.getTime() + exdays*24*60*60*1000);
		var c_value=encodeURIComponent(value) + ((exdays) ? "; expires="+exdate.toGMTString() : "" ) + "; domain="+ (domain ||MY.cookieDomain) + "; path="+ (path || "/");
		document.cookie=c_name + "=" + c_value;
		return true;
	}
	
	MY.delCookie=function(c_name,value,domain,path)
	{
		var c_value=encodeURIComponent(value) + "; expires="+(new Date(0)).toGMTString()  + ((domain)?"; domain="+ domain:"") + "; path="+ (path || "/");
		document.cookie=c_name + "=" + c_value;
		return true;
	}
	
	
	MY.each = function(f, c) {
		if (MY.isFunction(c)) {
			var d, g, e;
			if (MY.isArray(f)) {
				for (d = 0, g = f.length; d < g; d++) {
					e = c(f[d], d);
					if (e === false) {
						break
					}
				}
			} else {
				if (MY.isObject(f)) {
					for (d in f) {
						if (f.hasOwnProperty(d)) {
							e = c(f[d], d);
							if (e === false) {
								break
							}
						}
					}
				}
			}
		}
	};

	MY.isArray = function(e) {
		return MY.typeOf(e) === "array";
	}

	MY.isFunction = function(e) {
		return MY.typeOf(e) === "function";
	}

	MY.isObject = function(f, e) {
		return (f && (typeof f === "object" || (!e && MY.isFunction(f)))) || false;
	}

	MY.isString = function(e) {
		return typeof e === "string";
	}

	MY.isNumber = function(e) {
		return typeof e === "number" && isFinite(e);
	}

	MY.typeOf = function(e) {
		var d = {
				"undefined": "undefined",
				number: "number",
				"boolean": "boolean",
				string: "string",
				"[object Function]": "function",
				"[object RegExp]": "regexp",
				"[object Array]": "array",
				"[object Date]": "date",
				"[object Error]": "error"
		};
		return d[typeof e] || d[Object.prototype.toString.call(e)] || (e ? "object": "null");
	}

	MY.flashPlayerVersion= function() {
		var playerVersion = [0, 0, 0],
		d = null;
		if (typeof MY.nav.plugins != "undefined" && typeof MY.nav.plugins["Shockwave Flash"] == "object") {
			d = MY.nav.plugins["Shockwave Flash"].description;
			if (d && !(typeof MY.nav.mimeTypes != "undefined" && MY.nav.mimeTypes["application/x-shockwave-flash"] && !MY.nav.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
			}
		} else {
			if (typeof window.ActiveXObject != "undefined") {
				try {
					var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (a) {
						d = a.GetVariable("$version");
						if (d) {
							d = d.split(" ")[1].split(",");
							playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]
						}
					}
				} catch(e) {}
			}
		}
		return playerVersion.join(".")
	}
	MY.uaFormat= function() {
		var data = ["os:" + (MY.ua.os || "-")];
		var match;
		var osVersion = /Windows NT ([\d\.]*)/i.exec(navigator.userAgent) || /Mac OS X ([\d\.]*)/i.exec(navigator.userAgent) || /OS ([\d_]*)/i.exec(navigator.userAgent);
		osVersion = osVersion ? osVersion[1] : "-";
		data.push("ov:" + (osVersion || "-"));
		if (MY.ua.ie) {
			data.push("bn:ie");
			data.push("bv:" + MY.ua.ie)
		} else {
			if (MY.ua.webkit) {
				data.push("bn:webkit");
				data.push("bv:" + MY.ua.webkit)
			} else {
				if (MY.ua.gecko) {
					if(MY.ua.FF){
						data.push("bn:FF");
						data.push("bv:" + MY.ua.FF)
					}else{
						data.push("bn:gecko");
						data.push("bv:" + MY.ua.gecko)
					}
				} else {
					data.push("bn:-");
					data.push("bv:-")
				}
			}
		}
		data.push("dv:" + (window.navigator.platform || "-"));
		data.push("rl:" + window.screen.width + "," + window.screen.height);
		return data.join("|")
	}

	MY.screenFormart= function() {
		if (self.screen) {
			return screen.width + "," + screen.height
		} else {
			if (self.java) {
				var j = java.awt.Toolkit.getDefaultToolkit();
				var s = j.getScreenSize();
				return s.width + "," + s.height
			}
		}
		return ""
	}

	MY.getOrganicInfo = function() {
		var ref = document.referrer && !/(mayi.com|mayi.cn)|(openapi.qzone.qq.com)/i.test(MY.parseUrl(document.referrer).host)&&/(ca_n|ca_s|ca_source|ca_kw|ca_i|ca_name)/i.test(document.referrer) ? document.referrer: null;
		console.log("MY.parseUrl(document.referrer).host:"+MY.parseUrl(document.referrer).host+",ref:"+ref);
		var caSource, caName, caKw, caId, caS, caN, caI;
		var refUrlData = MY.parseUrl(document.referrer);
		var selfUrlData = MY.parseUrl(window.location.href);
		var organics = MY.getOrganics();
		var isUtf8 = /[\?&]\w+=utf/i.test(document.referrer);
		if (!ref) {
			caSource = selfUrlData.params.ca_source || MY.getTrackerCookie("ca_source");
			caName = selfUrlData.params.ca_name || MY.getTrackerCookie("ca_name");
			caKw = selfUrlData.params.ca_kw || MY.getTrackerCookie("ca_kw");
			caId = selfUrlData.params.ca_id || MY.getTrackerCookie("ca_id");
			caN = selfUrlData.params.ca_n || MY.getTrackerCookie("ca_n");
			caI = selfUrlData.params.ca_i || MY.getTrackerCookie("ca_i");
			caS = selfUrlData.params.ca_s || MY.getTrackerCookie("ca_s");
			if (!caS || caS === "-") {
				caS = "self"
			}
		} else {
			caSource = selfUrlData.params.ca_source || refUrlData.host;
			caName = selfUrlData.params.ca_name || "";
			caKw = selfUrlData.params.ca_kw || "";
			caId = selfUrlData.params.ca_id || "";
			caN = selfUrlData.params.ca_n || "";
			caS = selfUrlData.params.ca_s;
			caI = selfUrlData.params.ca_i;
			if (!caS) {
				MY.each(searchEngineHostMap,function(name, host) {
					if (new RegExp("^([a-zA-Z\\d]+\\.){0,}" + host, "i").test(refUrlData.host)) {
						caS = "seo_" + name;
						if (!caN) {
							caN = "-"
						}
						return false
					}
				});
				if (!caS) {
					caS = "other_" + refUrlData.host
				}
			}
			if (!caKw) {
				MY.each(organics,function(v) {
					if (new RegExp("^([a-zA-Z\\d]+\\.){0,}" + v[0], "i").test(refUrlData.host)) {
						var kw = refUrlData.params[v[1]];
						if (kw) {
							caKw = kw + "|" + (isUtf8 ? "utf8": "");
							if (!caName) {
								caName = "se"
							}
							return false
						}
					}
				})
			}
		}
		caSource = caSource || "-";
		caName = caName || "-";
		caKw = caKw || "-";
		caId = caId || "-";
		caS = caS || "-";
		caN = caN || "-";
		caI = caI || "-";
		MY.setTrackerCookie("ca_source", caSource);
		MY.setTrackerCookie("ca_name", caName);
		MY.setTrackerCookie("ca_kw", caKw);
		MY.setTrackerCookie("ca_id", caId);
		MY.setTrackerCookie("ca_s", caS);
		MY.setTrackerCookie("ca_n", caN);
		MY.setTrackerCookie("ca_i", caI);
		return [caSource, caName, caKw, caId, caS, caN, caI];
	}

	MY.parseUrl = function(d) {
		var g = document,
		h = g.location,
		c = g.createElement("a");
		d = d || h.href;
		if (d.indexOf("://") === -1 && MY.ua.ie) {
			var e = h.protocol + "//" + h.host;
			if (d.indexOf("/") === 0) {
				e += d
			} else {
				e += h.pathname.replace(/\/[\w\.]+$/, "/") + d
			}
			d = e
		}
		c.href = d;
		var f = {
				source: d,
				protocol: c.protocol.replace(":", ""),
				host: c.hostname,
				port: c.port,
				query: c.search,
				params: (function() {
					var l = {},
					o = d.replace(/^[^\?]+/, "").replace(/#.*$/, ""),
					k = o.replace(/^\?/, "").split("&"),
					j = k.length,
					m = 0,
					n;
					for (; m < j; m++) {
						if (!k[m]) {
							continue
						}
						n = k[m].split("=");
						l[n[0]] = n[1] || ""
					}
					return l
				})(),
				file: (c.pathname.match(/\/([^\/?#]+)$/i) || [,""])[1],
				hash: c.hash.replace("#",""),
				path: c.pathname.replace(/^([^\/])/, "/$1"),
				relative: (c.href.match(/tps?:\/\/[^\/]+(.+)/) || [,""])[1],
				segments: c.pathname.replace(/^\//, "").split("/")
		};
		return f
	}

	MY.getOrganics = function() {
		return [["baidu", "wd"], ["baidu", "word"], ["images.google", "q"], ["google", "q"], ["yahoo", "p"], ["msn", "q"], ["live", "q"], ["soso", "w"], ["sogou", "query"], ["bing", "q"], ["so.360.cn", "q"], ["so.com", "q"], ["haosou.com", "q"], ["haoso.com", "q"]]
	}

	searchEngineHostMap = {
			"baidu.com": "baidu",
			"google.com": "google",
			"sogou.com": "sogou",
			"soso.com": "soso",
			"so.com": "360",
			"haoso.com": "360",
			"haosou.com": "360",
			"youdao.com": "youdao",
			"bing.com": "bing"
	}

	MY.getUa = function() {
		var h = function(e) {
			var m = 0;
			return parseFloat(e.replace(/\./g,
					function() {
				return (m++==1) ? "": "."
			}))
		},
		c = MY.win && MY.win.navigator,
		d = c && c.userAgent,
		j = MY.win && MY.win.location,
		f = j && j.href,
		i,
		g = {
				ie: 0,
				opera: 0,
				gecko: 0,
				FF: 0,
				webkit: 0,
				chrome: 0,
				mobile: null,
				air: 0,
				ipad: 0,
				iphone: 0,
				ipod: 0,
				ios: null,
				android: 0,
				caja: c && c.cajaVersion,
				secure: false,
				os: null,
				isqplus: false,
				is360app: false
		};
		g.secure = f && (f.toLowerCase().indexOf("https") === 0);

		if (d) {
			if ((/windows|win32/i).test(d)) {
				g.os = "windows"
			} else {
				if ((/macintosh/i).test(d)) {
					g.os = "macintosh"
				} else {
					if ((/rhino/i).test(d)) {
						g.os = "rhino"
					}
				}
			}
			if ((/KHTML/).test(d)) {
				g.webkit = 1
			}
			i = d.match(/AppleWebKit\/([^\s]*)/);
			if (i && i[1]) {
				g.webkit = h(i[1]);
				if (/ Mobile\//.test(d)) {
					g.mobile = "Apple";
					i = d.match(/OS ([^\s]*)/);
					if (i && i[1]) {
						i = h(i[1].replace("_", "."))
					}
					g.ipad = (navigator.platform == "iPad") ? i: 0;
					g.ipod = (navigator.platform == "iPod") ? i: 0;
					g.iphone = (navigator.platform == "iPhone") ? i: 0;
					g.ios = g.ipad || g.iphone || g.ipod
				} else {
					i = d.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
					if (i) {
						g.mobile = i[0]
					}
					if (/ Android/.test(d)) {
						g.mobile = "Android";
						i = d.match(/Android ([^\s]*);/);
						if (i && i[1]) {
							g.android = h(i[1])
						}
					}
				}
				i = d.match(/Chrome\/([^\s]*)/);
				if (i && i[1]) {
					g.chrome = h(i[1])
				} else {
					i = d.match(/AdobeAIR\/([^\s]*)/);
					if (i) {
						g.air = i[0]
					}
				}
			}
			if (!g.webkit) {
				i = d.match(/Opera[\s\/]([^\s]*)/);
				if (i && i[1]) {
					g.opera = h(i[1]);
					i = d.match(/Opera Mini[^;]*/);
					if (i) {
						g.mobile = i[0]
					}
				} else {
					i = d.match(/MSIE\s([^;]*)/);
					if (i && i[1]) {
						g.ie = h(i[1])
					} else {
						i = d.match(/Gecko\/([^\s]*)/);
						if (i) {
							g.gecko = 1;
							i = d.match(/rv:([^\s\)]*)/);
							if (i && i[1]) {
								g.gecko = h(i[1]);
							}
						}
						i = d.match(/Firefox\/([^\s]*)/);
						if(i){
							g.FF = 1;
							i = d.match(/rv:([^\s\)]*)/);
							if(i && i[1]){
								g.FF = h(i[1]);
							}
						}
					}
					var l = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
					if (l.exec(d) != null) {
						g.ie = parseFloat(RegExp.$1)
					}
				}
			}
		}
		try {
			if (b.external && b.external.qplus && MY.isObject(b.external.qplus)) {
				g.isqplus = true
			}
			if (!g.isqplus && b.external && b.external.wappGetAppId && b.external.wappGetAppId()) {
				g.is360app = true
			}
		} catch(k) {}
		return g
	};
	MY.getTrackerCookie = function(name) {
		try {
			var cookie = MY.getCookie("_my_tracker");
//			var gjCookie = MY.getCookie("_gl_tracker");
			ret = cookie ? MY.jsonDecode(cookie) : {};
//			ret = gjCookie ? MY.jsonDecode(gjCookie) : (cookie ? MY.jsonDecode(cookie):{});
			return name ? (ret[name] || null) : ret;
		} catch(e) {
			return {};
		}
	}
	MY.setTrackerCookie = function(name, value) {
		var cookie = MY.getTrackerCookie();
		cookie[name] = value;
		MY.setCookie("_my_tracker", MY.jsonEncode(cookie),null,null,30)
	}

	var _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	_ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	_VALUES = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	_BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,
		_UNSAFE = /[^\],:{}\s]/,
		_escapeException = function(c) {
		return "\\u" + ("0000" + ( + (c.charCodeAt(0))).toString(16)).slice( - 4)
	},
	_parse = function(s, reviver) {
		s = s.replace(_UNICODE_EXCEPTIONS, _escapeException);
		s = s.replace(_ESCAPES, "@");
//		s = s.replace(_VALUES, "]");
		s = s.substring(s.indexOf("{"),s.indexOf("}")+1);
		s = s.replace(_BRACKETS, "");
		return eval("(" + s + ")");
	};
	MY.jsonDecode = function(s) {
		if (!MY.isString(s)) {
			s += ""
		}
		return _parse(s)
	}

	var isFunction = MY.isFunction,
	isObject = MY.isObject,
	isArray = MY.isArray,
	_toStr = Object.prototype.toString,
	UNDEFINED = "undefined",
	OBJECT = "object",
	NULL = "null",
	STRING = "string",
	NUMBER = "number",
	BOOLEAN = "boolean",
	DATE = "date",
	_allowable = {
			"undefined": UNDEFINED,
			string: STRING,
			"[object String]": STRING,
			number: NUMBER,
			"[object Number]": NUMBER,
			"boolean": BOOLEAN,
			"[object Boolean]": BOOLEAN,
			"[object Date]": DATE,
			"[object RegExp]": OBJECT
	},
	_SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	_CHARS = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
	},
	dateToString = function(d) {
		function _zeroPad(v) {
			return v < 10 ? "0" + v: v
		}
		return d.getUTCFullYear() + "-" + _zeroPad(d.getUTCMonth() + 1) + "-" + _zeroPad(d.getUTCDate()) + "T" + _zeroPad(d.getUTCHours()) + ":" + _zeroPad(d.getUTCMinutes()) + ":" + _zeroPad(d.getUTCSeconds()) + "Z"
	};

	function _type(o) {
		var t = typeof o;
		return _allowable[t] || _allowable[_toStr.call(o)] || (t === OBJECT ? (o ? OBJECT: NULL) : UNDEFINED)
	}

	function _char(c) {
		if (!_CHARS[c]) {
			_CHARS[c] = "\\u" + ("0000" + ( + (c.charCodeAt(0))).toString(16)).slice( - 4)
		}
		return _CHARS[c]
	}

	function _string(s) {
		return '"' + s.replace(_SPECIAL_CHARS, _char) + '"'
	}

	function _indent(s, space) {
		return s.replace(/^/gm, space)
	}

	function _stringify(o, space) {
		if (o === undefined) {
			return undefined
		}
		var w = null;
		var format = _toStr.call(space).match(/String|Number/) || [],
		stack = [];
		space = format[0] === "Number" ? new Array(Math.min(Math.max(0, space), 10) + 1).join(" ") : (space || "").slice(0, 10);
		function _serialize(h, key) {
			var value = h[key],
			t = _type(value),
			a = [],
			colon = space ? ": ": ":",
					arr,
					i,
					keys,
					k,
					v;
			if (isObject(value) && isFunction(value.toJSON)) {
				value = value.toJSON(key)
			} else {
				if (t === DATE) {
					value = dateToString(value)
				}
			}
			if (value !== h[key]) {
				t = _type(value)
			}
			switch (t) {
			case DATE:
			case OBJECT:
				break;
			case STRING:
				return _string(value);
			case NUMBER:
				return isFinite(value) ? value + "": NULL;
			case BOOLEAN:
				return value + "";
			case NULL:
				return NULL;
			default:
				return undefined
			}
			for (i = stack.length - 1; i >= 0; --i) {
				if (stack[i] === value) {
					throw new Error("JSON.stringify. Cyclical reference")
				}
			}
			arr = isArray(value);
			stack.push(value);
			if (arr) {
				for (i = value.length - 1; i >= 0; --i) {
					a[i] = _serialize(value, i) || NULL
				}
			} else {
				keys = w || value;
				i = 0;
				for (k in keys) {
					if (keys.hasOwnProperty(k)) {
						v = _serialize(value, k);
						if (v) {
							a[i++] = _string(k) + colon + v
						}
					}
				}
			}
			stack.pop();
			if (space && a.length) {
				return arr ? "[\n" + _indent(a.join(",\n"), space) + "\n]": "{\n" + _indent(a.join(",\n"), space) + "\n}"
			} else {
				return arr ? "[" + a.join(",") + "]": "{" + a.join(",") + "}"
			}
		}
		return _serialize({"": o},"")
	};

	MY.jsonEncode = function(o, ind) {
		return _stringify(o, ind)
	}

	MY.getDs=function(){
		return (MY.getSw()+"x"+MY.getSh());
	}

	MY.getSw=function(){
		return MY.win.screen.height;
	}

	MY.getSh=function(){
		return MY.win.screen.width;
	}

	MY.getCl=function(){
		return (MY.win.screen?MY.win.screen.colorDepth+"-bit":"")
	}

	MY.getPF=function()
	{
		return navigator.platform ;
	}

	MY.getValue=function(m,n)
	{
		var l=new RegExp("(^|&|\\?)"+m+"=([^&]*)(&|\x24|#)");
		var cookie=n.match(l);
		return cookie?cookie[2]:""
	}

	MY.getDomain=function()
	{
		var  arydomain = new Array(".com.cn",".net",".net.cn",".cc",".org",".org.cn",".gov.cn",".info",".biz",".tv",".cn",".com"); 
		var  domain  =  document.domain;  
		var  tmpdomain  =  "";  
		for(var  i=0;i<arydomain.length;  i++)  
		{  
			tmpdomain  =  arydomain[i];  
			var k=domain.lastIndexOf(tmpdomain);
			if(k  !=  -1 && k+tmpdomain.length==domain.length)  
			{  
				domain  =  domain.substr(0,k);
				domain  =  domain.substring(domain.lastIndexOf(".")+1,domain.length);  
				domain  =  domain  +  tmpdomain;  
				break;
			}  
		}  
		return domain;
	}

	MY.rand = function(min, max) 
	{
		return parseInt(Math.random() * (max - min + 1) + max)
	}

	MY.getUuid=function()
	{
		MY.uuid = MY.getCookie(MY.uuid_name);
		MY.ext_3="-";
		if (!MY.uuid) {
			var t = +new Date(),
			v = MY.rand(10000000, 99999999),
			u = function(A) {
				var y = "",
				z, x = A.length;
				while (x > 0) {
					x--;
					y += A.substr(x, 1)
				}
				return y;
			},
			w = u(t + "" + MY.rand(1, 9));
			w = (w * 1 + v) + "" + v;
			MY.uuid=w;
			MY.setCookie(MY.uuid_name,w,MY.getDomain(),"/",365);
			MY.ext_3="3";
		}
		return MY.uuid;
	}

	MY.getMYSessionId = function() {
		var sessionId = MY.getCookie("sid");
		if (!sessionId) {
			sessionId = MY.guid();
			MY.setCookie("sid", sessionId);
		}
		return sessionId;
	}

	MY.getSessionId = function() {
		var sessionId=MY.getCookie("JSESSIONID");
		return (sessionId != "" && sessionId != null && sessionId != undefined) ? sessionId : MY.getMYSessionId();
	}

	MY.guid = function() {
		var d1 = new Date(),
		time = d1.getTime(),
		d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0);
		return ((time - d2.getTime()) * 1000 + MY.rand(1000, 9999))+""+MY.rand(1000, 9999)
	}

	MY.getUserId = function(){
		var uid = MY.getCookie("MAYIUID");
		return (uid != "" && uid != null && uid != undefined) ? uid : "-";
	}
	
	MY.getMYUserBehaviour = function(){
		var uh = MY.getCookie("MAYIUH");
		uh = (uh != "" && uh != null && uh != undefined) ? uh : "-";
		if(uh != "-"){
			//document.cookie="MAYIUH=-;expires="+(new Date(0)).toGMTString()+"; path=/";
			MY.delCookie("MAYIUH","-","","/");
			MY.ext_3=uh;
		}
		return uh;
	}

	MY.rand = function(d, c) {
		return parseInt(Math.random() * (c - d + 1) + d);
	}

	MY.getUrl = function(){
		var url = MY.win.location.href;
//		return url.substring(0,(url.indexOf("?")>-1) ? url.indexOf("?") : url.length);
		return MY._encodeURI(url);
	}

	MY.getBSource = function(){
		var bsource = document.getElementById("my_b_s"); 
		return (bsource == "" || bsource == null || bsource == undefined || bsource.value == "") ? "-" : bsource.value;
	}

	MY.getPlatform = function(){
		return (MY.win.location.href.indexOf("m.mayi.com") > -1 ? "wap" : "web");
//		return (MY.ua.mobile != "" &&  MY.ua.mobile!=null)? MY.ua.mobile : "web";
	}

	MY.isMobile = function(){
		return (MY.ua.mobile != "" &&  MY.ua.mobile!=null)? MY.ua.mobile : "web";
	}
	
	MY.getBid = function(){
//		var bid = $("#my_b_id").val();
		var bid = document.getElementById("my_b_id");
		return (bid == "" || bid == null || bid == undefined || bid.value == "") ? "-" : bid.value;
	}

	MY.getPagetype = function(){
//		var pt = $("#my_p_t").val();
		var pt = document.getElementById("my_p_t");
		return (pt == "" || pt == null || pt == undefined || pt.value == "")? "-" : pt.value;
	}
	
	MY.getCityPY = function(){
//		var pt = $("#my_p_t").val();
		var py = document.getElementById("my_p_y");
		return (py == "" || py == null || py == undefined || py.value == "")? "-" : py.value;
	}

	MY.getPtime = function(){
//		var pt = $("#my_p_time").val();
		var pt = document.getElementById("my_p_time");
		return (pt == "" || pt == null || pt == undefined || pt.value == "")? "-" : pt.value;
	}

	MY.getPtype = function(){
//		var pt = $("#my_p_type").val();
		var pt = document.getElementById("my_p_type");
		return (pt == "" || pt == null || pt == undefined || pt.value == "")? "-" : pt.value;
	}

	MY.getExtdate = function(){
//		var extdate = $("#my_ext_date").val();
		var extdate = document.getElementById("my_ext_date");
		return (extdate == "" || extdate == null || extdate == undefined || extdate.value == "")? "-" : extdate.value;
	}

	MY.getType = function(){
//		var extdate = $("#my_t_ty").val();
		var extdate = document.getElementById("my_t_ty");
		return (extdate == "" || extdate == null || extdate == undefined || extdate.value == "")? "-" : extdate.value;
	}

	MY.getPsource = function(){
		if(MY.win.location.href.indexOf("/paysuccess") > -1){
			return (MY.win.location.href.indexOf("m.mayi.com") > -1 || MY.win.location.href.indexOf("prewap.mayi.com") > -1)  ? "wap" : "web";
		}
		return "-";
	}

	MY._encodeURI = function(k, l) {
		if(k != null && k != undefined && k != ""){
			var g = encodeURIComponent;
			if (g instanceof Function) {
				return l ? encodeURI(k) : g(k)
			} else {
				return escape(k)
			}
		}else{
			return "-";
		}
	}

	MY.send_p=function(){
		MY.init();
		var d=new Date();
		var act_time=d-MY.last_pb_time;
		MY.last_pb_time=d;
		var org=MY.getOrganicInfo();
		MY.ua_format = MY.uaFormat().split("|");
		var urlHost="http://anatest.mayi.com";
		if(MY.getUrl().indexOf("58.partner.mayi.com")>-1 || MY.getUrl().indexOf("m.mayi.com")>-1 || MY.getUrl().indexOf("www.mayi.com")>-1){
			urlHost=MY.host;
		}
		var url =urlHost + "/" + MY.img_file
		+ "?l_type="+MY.log_type
		+ "&ext1="+MY._encodeURI(MY.ext_1)
		+ "&ext2="+MY._encodeURI(MY.ext_2)
		+ "&ext3="+MY._encodeURI(MY.ext_3)
		+ "&uuid=" + MY.uuid
//		+ "&t=" + d.pattern("yyyy-MM-dd hh:mm:ss")
		+ "&t=" + (MY.cookieEnabled+","+MY.javaEnabled || "-")
		+ "&userid=" + MY.getUserId()
		+ "&sid=" + MY.getSessionId()
//		+ "&sid=" + MY.getMYSessionId()
		+ "&ca_source=" + (org[0] || "-")
		+ "&ca_name=" + (org[1] || "-")
//		+ "&ca_kw=" + (org[2] || "-")
		+ "&ca_kw=" + (MY.getCookie("_keyword") || "-").replace(/[&=?]/gi, "")
		+ "&ca_id=" + (org[3] || "-")
//		+ "&ca_s=" + (org[4] || "-")
//		+ "&ca_n=" + (org[5] || "-")
//		+ "&ca_i=" + (org[6] || "-")
		+ "&ca_s=" + (MY.getCookie("_channel") || "-")
		+ "&ca_n=" + (MY.getCookie("_caname") || "-")
		+ "&ca_i=" + (MY.getCookie("_caid") || "-")
		+ "&refer=" + MY.getDocument_refer()
		+ "&fv=" + MY.flashPlayerVersion()
//		+ "&ua=" + MY.ua_format[2].split(":")[1]
		+ "&ua=" + MY.ua_format
		+ "&version=" + MY.ua_format[3].split(":")[1]
		+ "&swidth=" + MY.getSw()
		+ "&sheight=" + MY.getSh()
		+ "&b_source=" + MY.getBSource()
		+ "&bid=" + MY.getBid()
		+ "&p_source=" + MY.p_source
		+ "&p_type=" + MY.p_type
		//+ "&p_time=" + MY.p_time
		+ "&log_platform=" + MY.getPlatform()
		+ "&page_type=" + MY.getPagetype()
		+ "&city=" + MY.getCityPY()
		+ "&url=" + MY.getUrl();
		MY.pingback(url);
	}
	MY.pingback=function(url){
//		if(MY.isMobile() == 'web'){
//			var img = new Image(1, 1);
//			img.onload = img.onerror = img.onabort = function() {
//	            img.onload = img.onerror = img.onabort = null;
//			};
//			img.src = url;
//		}else{
//			var request = new XMLHttpRequest();
//			request.open("GET",url);
//			request.send();
//		}
		
		var img = new Image(1, 1);
		img.onload = img.onerror = img.onabort = function() {
            img.onload = img.onerror = img.onabort = null;
		};
		img.src = url;	

//		$.ajax({
//			type: "GET",
//			url: url,
//			contentType: "application/json",
//			dataType: "json",
//			success: function(json, status){
//				return true;
//			}
//		});
		
//		setTimeout(function(){
//			if(MY.isMobile()=='web'){
//				var img = new Image();
//				img.src = url;	
//			}else{
//				var request = new XMLHttpRequest();
//				request.open("GET",url);
//				request.send();
//			}
//		}, 1000);
		
//		var request = new XMLHttpRequest();
//		request.open("GET",url);
//		request.send();
		
//		var ifr = document.createElement("iframe");
//		ifr.setAttribute("src", url);  
//		ifr.setAttribute("style", "display:none");  
//		document.body.appendChild(ifr);  
//		setTimeout(function () {  
//			document.body.removeChild(ifr);
//		}, 1000);  
	}

	Date.prototype.pattern=function(fmt) {         
		var o = {         
				"M+" : this.getMonth()+1, //月份         
				"d+" : this.getDate(), //日         
				"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
						"H+" : this.getHours(), //小时         
						"m+" : this.getMinutes(), //分         
						"s+" : this.getSeconds(), //秒         
						"q+" : Math.floor((this.getMonth()+3)/3), //季度         
						"S" : this.getMilliseconds() //毫秒         
		};         
		var week = {         
				"0" : "/u65e5",         
				"1" : "/u4e00",         
				"2" : "/u4e8c",         
				"3" : "/u4e09",         
				"4" : "/u56db",         
				"5" : "/u4e94",         
				"6" : "/u516d"        
		};         
		if(/(y+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
		}         
		if(/(E+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
		}         
		for(var k in o){         
			if(new RegExp("("+ k +")").test(fmt)){         
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
			}         
		}         
		return fmt;         
	}

	MY.init = function(){
		MY.p_time = MY.getPtime();
		MY.p_source = MY.getPsource();
		MY.p_type = MY.getPtype();
		MY.ua = MY.getUa();
		MY.uuid = MY.getUuid();
		MY.getMYUserBehaviour();
	}
//	MY.getIp = function(){
//		var ip ="223.78.77.113";
//		$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip='+ip, 
//				function(_result){     
//			if (remote_ip_info.ret == '1'){     
//				console.log('IP 详细信息：', 'IP：'+ip+'<BR>国家：'+remote_ip_info.country+'<BR>省份：'+remote_ip_info.province+'<BR>城市：'+remote_ip_info.city+'<BR>区：'+remote_ip_info.district+'<BR>ISP：'+remote_ip_info.isp+'<BR>类型：'+remote_ip_info.type+'<BR>其他：'+remote_ip_info.desc);     
//			} else {     
//				console.log('错误', '没有找到匹配的 IP 地址信息！');     
//			} 
//		});
//	}
	
//	$(document).ready(function(){
	MY.send_p();
//	});
})();
