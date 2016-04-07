//var localHost = "http://192.168.41.60:8099/duanzu/wap";
//var serviceUrl = "http://192.168.41.60:8099/duanzu/wap";
//var localHost = "http://wap.corp.mayi.com";
//var serviceUrl = "http://wap.corp.mayi.com";
//var localHost = "http://127.0.0.1:8099/duanzu/wap";
//var serviceUrl = "http://127.0.0.1:8099/duanzu/wap";
var localHost = "http://m.mayi.com";
var serviceUrl = "http://m.mayi.com";
//var localHost = "http://prewap.mayi.com";
//var serviceUrl = "http://prewap.mayi.com";


/**
* 通用的列表类，根据主键 code/key 检索和删除 Item
*
* @returns
* 
*/
var ItemList = function() {
    this.length = 0;
    this.items = [];
};
ItemList.prototype = {
    /**
* put data item into items
*
* @param d
*/
    put: function(d) {
        return this._getput(d.id, true, d);
    },
    /**
* delete data item from items by code
*
* @param code
*/
    del: function(code) {
        this._getput(code, true);
    },
    /**
*添加多条
*/
    join: function(items) {
        for (var i = 0; i < items.length; i++) {
            this.put(items[i]);
        }
    },
    empty: function() {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            this.items.splice(0, 1);
        }
        this.length = 0;
    },
    /**
* get data item from items by code
*
* @param code
*/
    get: function(code, remove) {
        return this._getput(code);
    },
    /**
*
* @param code
* @param remove
* @param item
* @returns
*/
    _getput: function(code, remove, item) {
        var a = this.items;
        var n = a.length;
        for (var i = 0; i < n; i++) {
            var d = a[i];
            if (d.code == code) {
                if (item) {
                    d = item;
                    a[i] = d; // found and replace
                } else if (remove) {
                    a.splice(i, 1);
                    this.length = a.length;
                }
                return d; // found
            }
        }
        if (item) {
            // trace('_getput:' + item);
            // not found, append
            a[a.length] = item;
            this.length = a.length;
        }
        return null; // not found
    }
};

/**
* 通用的列表类，根据主键 code/key 检索和删除 Item
*
* @returns
*/
var ItemSet = function() {
    this.length = 0;
    this.items = {};
};
ItemSet.prototype = {
    /**
	* put data item into items
	*
	* @param d
	*/
    put: function(key, value) {
        var obj = this.items;
        if ('undefined' == typeof obj[key]) {
            obj[key] = value;
            this.length++;
        } else {
            obj[key] = value;
        }
    },
	/**
	* delete data item from items by code
	*
	* @param code
	*/
    del: function(key) {
        if ('undefined' == typeof this.items[key]) {
            return;
        }
        this.items[key] = undefined;
        delete this.items[key];
        this.length--;
    },
    empty: function() {
        this.length = 0;
        this.items = {};
    },
	/**
	* get data item from items by code
	*
	* @param code
	*/
    get: function(key) {
        var obj = this.items;
        if ('undefined' == typeof obj[key]) {
            return;
        }
        return obj[key];
    }
};

/**
 * 带参数的定时调用；代替 setTimeout 使用
 * 
 * @param o
 *            callback function.this
 * @param f
 *            callback function
 * @param t
 *            timeout
 */
function callTimeout(o, f, t)
{
	var a = $A(arguments);
	a.shift(); // drop parameter o
	a.shift(); // drop parameter f
	a.shift(); // drop parameter t
	setTimeout(function()
	{
		f.apply(o, a);
	}, t);
}

var $A = Array.from = function(iterable) {
	if (!iterable)
		return [];
	if (iterable.toArray) {
		return iterable.toArray();
	} else {
		var results = [];
		for ( var i = 0, length = iterable.length; i < length; i++)
			results.push(iterable[i]);
		return results;
	}
};

/**
 * 对字符串进行 UTF8 编码
 * 
 * @param s
 * @return
 */
function $U(s)
{
	return encodeURIComponent(s);
}



// ============================================================================
/**
 * 数据格式化器
 */
var $FMT =
{
    // 格式化为秒显示
    fmtSeconds : function(d)
    {
	    return d + ' 秒';
    },
    // 格式化为时间单位
    fmtTimes : function(d, english)
    {
	    if (d < 60) return d + (english ? 's' : ' 秒');
	    if (d < 3600)
	    {
		    var s = parseInt(d / 60) + (english ? 'm' : ' 分');
		    if ((d % 60) > 0)
		    {
			    s += (english ? '' : ' ') + (d % 60) + (english ? 's' : ' 秒');
		    }
		    return s;
	    }
	    if (d < 86400)
	    {
		    var s = parseInt(d / 3600) + (english ? 'h' : ' 时');
		    if ((d % 3600) > 0)
		    {
			    s += (english ? '' : ' ') + parseInt((d % 3600) / 60) + (english ? 'm' : ' 分');
			    if ((d % 60) > 0)
			    {
				    s += (english ? '' : ' ') + (d % 60) + (english ? 's' : ' 秒');
			    }
		    }
	    } else
	    {
		    return (english ? '+1d' : '1 天以上');
	    }
	    return s;
    },
    // 格式化显示周几
    fmtWeekDay : function(o)
    {
	    if (typeof o == 'string') o = $DTU.parseDate(o);
	    var day = o.getDay();
	    return day == 0 ? 7 : day;
    },
    // 格式化显示时间(默认2009-10-01)，c作为分隔符（可以传'/'，则结果是2009/10/01）
    fmtDate : function(o, c)
    {
	    if (typeof o == 'string') o = $DTU.parseDate(o);
	    if ('undefined' == typeof o || null == o || '' == o)
	    {
		    return '';
	    }
	    var y = o.getFullYear();
	    var m = o.getMonth() + 1;
	    if (m < 10) m = '0' + m;
	    var d = o.getDate();
	    if (d < 10) d = '0' + d;
	    if (c)
	    {

		    return y + c + m + c + d;
	    } else
	    {

		    return y + '-' + m + '-' + d;
	    }
    },
    // 格式化显示时间(默认2009-10-01)，c作为分隔符（可以传'/'，则结果是2009/10/01）
    fmtZnDate : function(o, c)
    {
	    if (typeof o == 'string') o = $DTU.parseDate(o);
	    if ('undefined' == typeof o || null == o || '' == o)
	    {
		    return '';
	    }
	    var y = o.getFullYear();
	    var m = o.getMonth() + 1;
	    if (m < 10) m = '0' + m;
	    var d = o.getDate();
	    if (d < 10) d = '0' + d; 
	    return  + m + '月' + d+'日';
	    
    },
    // 格式化显示时间(2009-10-01 12:12:36)
    fmtTimestamp : function(o)
    {
	    if (typeof o == 'string')
	    {
		    if (o == '1970-01-01') return '';
		    o = o.replace(/-/g, '/');
	    } else
	    {
		    if (o == 0 || o == -1 || o == 1000) return null;
	    }
	    o = new Date(o);
	    var y = o.getFullYear();
	    var m = o.getMonth() + 1;
	    if (m < 10) m = '0' + m;
	    var d = o.getDate();
	    if (d < 10) d = '0' + d;
	    var h = o.getHours();
	    if (h < 10) h = '0' + h;
	    var i = o.getMinutes();
	    if (i < 10) i = '0' + i;
	    var s = o.getSeconds();
	    if (s < 10) s = '0' + s;
	    var str = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
	    if ('1970-01-01 08:00:00' == str || '1970-01-01 00:00:01' == str)
	    {
		    return '';
	    }
	    return str;

    },
    // 格式化新闻时间(2009-10-01 12:12)
    fmtNSTime : function(o, media)
    {
	    if (!o) return '';
	    o = o.replace(/-/g, '/');
	    if (typeof o == 'string') o = new Date(o);
	    var y = o.getFullYear();
	    var m = o.getMonth() + 1;
	    if (m < 10) m = '0' + m;
	    var d = o.getDate();
	    if (d < 10) d = '0' + d;
	    var h = o.getHours();
	    if (h < 10) h = '0' + h;
	    var i = o.getMinutes();
	    if (i < 10) i = '0' + i;
	    var s = y + '-' + m + '-' + d + ' ' + h + ':' + i;
	    // （2011-10-10 ylk） 现在无论何种媒体都显示 时分，以前是：没有指定类型，或电视新闻，或网络新闻并且不是0时0分，则 有时分
	    // || (CONST.MEDIA_TV == media || (CONST.MEDIA_WEB == media && (0 != h +
	    // i)))

	    return s;
    },
    // 格式化时分(2009-10-01 12:12 -> 12:12)
    fmtHourMin : function(o)
    {
	    if (!o) return '';
	    o = o.replace(/-/g, '/');
	    if (typeof o == 'string') o = new Date(o);

	    var h = o.getHours();
	    if (h < 10) h = '0' + h;
	    var i = o.getMinutes();
	    if (i < 10) i = '0' + i;
	    var s = h + ':' + i;

	    return s;
    },
    // 格式化时分(2009-10-01 12:12:12 -> 12:12:12)
    fmtHourMinSec : function(o)
    {
	    if (!o) return '';
	    o = o.replace(/-/g, '/');
	    if (typeof o == 'string') o = new Date(o);

	    var h = o.getHours();
	    if (h < 10) h = '0' + h;
	    var i = o.getMinutes();
	    if (i < 10) i = '0' + i;
	    var s = o.getSeconds();
	    if (s < 10) s = '0' + s;
	    var r = h + ':' + i + ':' + s;

	    return r;
    },
    // 格式化广告时间(10-01 12:12:36)
    fmtAdTime : function(o)
    {
	    if (typeof o == 'string')
	    {
		    o = o.replace(/-/g, '/');
		    o = new Date(o);
	    }
	    var m = o.getMonth() + 1;
	    if (m < 10) m = '0' + m;
	    var d = o.getDate();
	    if (d < 10) d = '0' + d;
	    var h = o.getHours();
	    if (h < 10) h = '0' + h;
	    var i = o.getMinutes();
	    if (i < 10) i = '0' + i;
	    var s = o.getSeconds();
	    if (s < 10) s = '0' + s;
	    return m + '-' + d + ' ' + h + ':' + i + ':' + s;
    },
    // 格式化广告名称
    fmtAdName : function(s, m)
    {
	    if (null == s) return '';
	    return s.fixed(m);
    },
    // 格式化节目名称
    fmtProgName : function(s, m)
    {
	    if (null == s) return '';
	    return s.fixed(m);
    },
    // 格式化年月
    fmtYearMonth : function(ym)
    {
	    return parseInt(ym / 100) + '年' + (ym % 100) + '月';
    },
    /**
	 * 格式化百分比
	 */
    fmtPercent : function(percent, fraction)
    {
	    return (isNaN(percent) ? 0 : percent).toFixed(isNaN(fraction) ? 0 : fraction);
    },
    /**
	 * 格式化千分比
	 */
    fmtPermille : function(permille, fraction)
    {
	    return (isNaN(permille) ? 0 : permille).toFixed(isNaN(fraction) ? 0 : fraction);
    },
    /**
	 * 格式化千分位
	 */
    fmtCommafy : function(n)
    {
	    var negative = n < 0; // 负数
	    if (negative) n = -n;
	    var s = n + '';
	    s = s.substring((parseInt(n) + '').length, s.length); // 小数
	    n = parseInt(n);
	    while (n > 1000)
	    {
		    s = ',' + $STU.pad(n % 1000, 3) + s;
		    n = parseInt(n / 1000);
	    }
	    s = n + s;
	    return negative ? '-' + s : s;
    }
};
/**
 * Date Util 日期时间辅助函数
 */
var $DTU =
{
    /**
	 * 转换日期字符串为日期对象
	 * 
	 * trace($FMT.fmtDate($DTU.parseDate('2008-03-02')));
	 * trace($FMT.fmtDate($DTU.parseDate('2008-3-2')));
	 * trace($FMT.fmtDate($DTU.parseDate('2008/03/02')));
	 * trace($FMT.fmtDate($DTU.parseDate('2008/3/2')));
	 * trace($FMT.fmtDate($DTU.parseDate('2008 03 02')));
	 * trace($FMT.fmtDate($DTU.parseDate('2008 3 2')));
	 * 
	 */
    parseDate : function(s)
    {
	    var v = [];
	    var k = 0;
	    var i, c, n = s.length;
	    for (i = 0; i < n; i++)
	    {
		    c = s.charAt(i);
		    if (!('0' <= c && c <= '9') || i + 1 == n)
		    {
			    try
			    {
				    v.push(parseInt(s.substring(k, (i + 1 == n) ? n : i), 10));
				    k = i + 1;
			    } catch (e)
			    {
				    return null;
			    }
		    }
	    }
	    if (v.length < 3) return null;

	    return new Date(v[0], v[1] - 1, v[2]);
    },
    parseDateTime : function(s)
    {
	    var strDate = s;
	    if (strDate.length == 0) return false;

	    // 先判断是否为短日期格式：YYYY-MM-DD，如果是，将其后面加上00:00:00，转换为YYYY-MM-DD hh:mm:ss格式
	    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/; // 短日期格式的正则表达式
	    var r = strDate.match(reg);

	    if (r != null) // 说明strDate是短日期格式，改造成长日期格式
	    strDate = strDate + " 00:00:00";

	    reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/;
	    r = strDate.match(reg);
	    if (r == null)
	    {
		    alert("你输入的日期格式有误，正确格式为：2004-12-01 或 2004-12-01 12:23:45");
		    return false;
	    }

	    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5]
	            && d.getMinutes() == r[6] && d.getSeconds() == r[7])
	    {
		    return d;
	    } else
	    {
		    alert("你输入的日期或时间超出有效范围，请仔细检查！");
		    return false;
	    }
    },
    addMonth : function(o, month)
    {
	    var y = o.getFullYear();
	    var m = o.getMonth() + 1 + month;
	    if (m < 10) m = '0' + m;
	    var d = o.getDate();
	    if (d < 10) d = '0' + d;

	    var s = y + '-' + m + '-' + d;
	    return $DTU.parseDate(s);
    },
    nextMonth : function(o)
    {
	    var y = o.getFullYear();
	    var m = o.getMonth() + 1 + 1;
	    if (m < 10) m = '0' + m;
	    var d = 1 ;
	    if (d < 10) d = '0' + d;

	    var s = y + '-' + m + '-' + d;
	    return $DTU.parseDate(s);
    },
    
    addDays : function(d, days)
    {
	    return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
    },
    addMinutes : function(d, minutes)
    {
	    return new Date(d.getTime() + minutes * 60 * 1000);
    },
    /**
	 * 计算两个日期之间的时间差-以天为单位
	 * 
	 * @param d1
	 * @param d2
	 * @returns
	 */
    getDateMargin : function(d1, d2)
    {
	    return this.getMargin(d1, d2, 'D');
    },
    /**
	 * 计算两个日期之间的时间差
	 * 
	 * @param d1
	 * @param d2
	 * @param t
	 *            计量单位[可取值Y,M,D,h,m,s,ms]
	 * @returns 默认以ms为单位
	 */
    getMargin : function(d1, d2, t)
    {
	    var margin = d1.getTime() - d2.getTime();
	    if (0 > margin)
	    {
		    margin = -margin;
	    }
	    var n = 1;
	    if ('s' == t)
	    {
		    n = 1000;
	    } else if ('m' == t)
	    {
		    n = 1000 * 60;
	    } else if ('h' == t)
	    {
		    n = 1000 * 60 * 60;
	    } else if (('D' == t) || ('d' == t))
	    {
		    n = 1000 * 60 * 60 * 24;
	    } else if ('M' == t)
	    {
		    n = 1000 * 60 * 60 * 24 * 30;
	    } else if (('Y' == t) || ('y' == t))
	    {
		    n = 1000 * 60 * 60 * 24 * 30 * 365;
	    }
	    return parseInt(margin / n);

    },
    /**
	 * 返回相对于当前时间的时间差
	 * 
	 * @param par_time
	 * @returns
	 */
    normalizeTimeStringEnglish : function(par_time)
    {
	    var time = $DTU.parseDateTime(par_time);
	    var seconds = $DTU._calcMargin(time);
	    return (0 == seconds) ? "" : ($DTU._normalizeTime(seconds) + $DTU._normalizeSizeUnitEnglish(seconds));
    },
    /**
	 * 返回秒
	 * 
	 * @param time
	 *            时间对象
	 * @returns
	 */
    _calcMargin : function(time)
    {
	    var now = new Date();

	    var margin = time.getTime() - now.getTime();

	    margin = (margin + (margin >= 0 ? (+1000 / 2) : (-1000 / 2))) / (1000);

	    return Math.round(margin);
    },
    _normalizeTime : function(seconds)
    {
	    var value = seconds < 0 ? -seconds : seconds;
	    var time = "";

	    if (value < 60)
	    {
		    time = seconds; // 分钟
	    } else if (value < 60 * 60)
	    {
		    time = seconds / 60; // 分钟
	    } else if (value < 60 * 60 * 24)
	    {
		    time = seconds / 60 / 60; // 小时
	    } else if (value < 60 * 60 * 24 * 365)
	    {
		    time = seconds / 60 / (60 * 24); // 天
	    } else
	    {
		    time = seconds / 60 / (60 * 24 * 365); // 年
	    }

	    if (time != '' && time.toString().indexOf(".") != -1)
	    {
		    var m = time.toString().indexOf(".");
		    time = time.toString().substring(0, m + 2);
	    }
	    return (seconds > 0 ? "+" : "") + time;
    },
    /**
	 * 
	 * @param margin
	 *            秒
	 * @return
	 */
    _normalizeSizeUnitEnglish : function(margin)
    {
	    var value = margin < 0 ? -margin : margin;

	    if (value < 60)
	    {
		    return "s";
	    } else if (value < 60 * 60)
	    {
		    return "m";
	    } else if (value < 60 * 60 * 24)
	    {
		    return "h";
	    } else if (value < 60 * 60 * 24 * 365)
	    {
		    return "d";
	    } else
	    {
		    return "y";
	    }
    },
    /**
	 * 根据范围得到日期字符串 0 - 今天 1 - 昨天 7 - 本周 30 - 本月 365 - 今年
	 */
    getQuickDateString : function(sel)
    {
	    var now = new Date();

	    var year = now.getFullYear();
	    var month = now.getMonth();
	    var day = now.getDate();

	    var date1;
	    var date2;

	    if (sel == 1) // 昨天
	    {
		    date1 = new Date(year, month, day);
		    date1.setDate(date1.getDate() - 1);
		    date2 = new Date(date1);
	    } else if (sel == 7) // 本周
	    {
		    var d = now.getDay();
		    date1 = new Date(year, month, day);
		    date1.setDate(date1.getDate() - (0 == d ? 6 : (d - 1)));
		    date2 = new Date(date1);
		    date2.setDate(date2.getDate() + 6);
	    } else if (sel == 30) // 本月
	    {
		    date1 = new Date(year, month, 1);
		    date2 = new Date(date1);
		    date2.setMonth(date2.getMonth() + 1);
		    date2.setDate(date2.getDate() - 1);
	    } else if (sel == 365) // 今年
	    {
		    date1 = new Date(year, 0, 1);
		    date2 = new Date(date1);
		    date2.setYear(date2.getFullYear() + 1);
		    date2.setDate(date2.getDate() - 1);
	    } else
	    // if (sel == 0) // 今天
	    {
		    date1 = new Date(year, month, day);
		    date2 = new Date(date1);
	    }

	    var data = {}; // 返回数据

	    data.date1 = date1;
	    data.date2 = date2;

	    return data;
    }
};

function isDefined(v)
{
	return ('undefined' != typeof v);
}

/**
 * UI 核心类
 * 
 * 静态工具类
 */
var UI =
{
    /**
	 * 计算单个字符所占像素点
	 */
    /*
	 * charsize : function(c, fontSize, bold) { if (!isDefined(fontSize))
	 * fontSize = 12; if (bold) ++fontSize; return (c < 255) ? (fontSize / 2) :
	 * fontSize; // 英文等字母占fontSize/2个像素，汉字占fontSize个像素 },
	 */
    charsize : function(c, fontSize, bold)
    {
	    if (!isDefined(fontSize)) fontSize = 12;
	    if (false)
	    {
		    if (fontSize == 12)
		    {
			    return this.computeIE12(c, fontSize, bold);
		    } else
		    {
			    return this.computeIE14(c, fontSize, bold);
		    }
	    } else
	    {

		    return this.compute(c, fontSize, bold);
	    }

    },
    computeIE12 : function(c, fontSize, bold)
    {
	    var regSize_2 = /['|]/;// (fontSize-8)/fontSize 不加粗如12pxfontSize 就是2
	    var regSize_3 = /[ij:;\\,·.\/]/;// (fontSize-6)/fontSize
	    // 不加粗如12pxfontSize 就是 3
	    var regSize_3_b = /[|\'\\,·.\/]/;// (fontSize-6)/fontSize 加粗
	    var regSize_4 = /[rt•fI\`\(\)\-\[\]]/; // (fontSize-4)/fontSize
	    // 不加粗如12pxfontSize 就是 4
	    var regSize_4_b = /[tifjI\`\(\)\-\[\]:;]/;// (fontSize-4)/fontSize 加粗
	    var regSize_5 = /[easgxcJ"?]/;// 字号的(fontSize-2)/fontSize不加粗
	    // 如12pxfontSize 就是5px
	    var regSize_5_b = /[rsv•c{}]/;// (fontSize-2)/fontSize加粗
	    var regSize_6 = /[quodhkzvbns~#^*_{}1234567890S$]/; // size是字号的一半不加粗的情况
	    // 如12pxfontSize
	    // 就是6px
	    var regSize_6_b = /[qeyopadgzxb~#*_?1234567890J$]/;// size是字号的一半加粗的情况
	    var regSize_7 = /[ypEPF+=>×]/;// (fontSize+2)/fontSize
	    // 不加粗如12pxfontSize 就是 7
	    var regSize_7_b = /[uhknEPZF^+=>×"]/;// (fontSize+2)/fontSize 加粗
	    var regSize_8 = /[RTYZCVB]/;// (fontSize+4)/fontSize 不加粗如12pxfontSize 就是
	    // 8
	    var regSize_8_b = /[wRYTUASXVB]/;// (fontSize+4)/fontSize 加粗
	    var regSize_9 = /[wmQUOADGHKXN]/;// (fontSize+6)/fontSize
	    // 不加粗如12pxfontSize 就是 9
	    var regSize_9_b = /[DGHKN&C]/;// (fontSize+6)/fontSize 加粗
	    var regSize_10 = /[%]/;
	    var regSize_10_b = /[mQO]/;
	    var regSize_11 = /[W@]/;
	    var regSize_11_b = /[WM@%]/;
	    var regSize_12 = /[M【】｛｝《》～！＠＃￥％＆（）]|[\u4e00-\u9fa5]/;

	    var oneLinePix = 0;
	    var f = 0;
	    if (c == " ")
	    {
		    oneLinePix += (fontSize - 6) / fontSize;
		    // oneLinePix +=(fontSize-4)/fontSize ;
	    } else if ((regSize_2.test(c) && !bold))
	    {
		    oneLinePix += (fontSize - 8) / fontSize;
	    } else if ((regSize_3.test(c) && !bold) || (regSize_3_b.test(c) && bold))
	    {
		    if (_browser.IE6)
		    {
			    if (c == "·")
			    {
				    oneLinePix += 2;
				    if (bold) f = 1;
			    } else
			    {
				    oneLinePix += (fontSize - 6) / fontSize;
			    }
		    } else
		    {
			    oneLinePix += (fontSize - 6) / fontSize;
		    }

	    } else if ((regSize_4.test(c) && !bold) || (regSize_4_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize - 4) / fontSize;
	    } else if ((regSize_5.test(c) && !bold) || (regSize_5_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize - 2) / fontSize;
	    } else if ((regSize_6.test(c) && !bold) || (regSize_6_b.test(c) && bold))
	    {
		    oneLinePix += 1;
	    } else if ((regSize_7.test(c) && !bold) || (regSize_7_b.test(c) && bold))
	    {
		    if (_browser.IE6)
		    {
			    if (c == "×")
			    {
				    oneLinePix += 2;
				    if (bold) f = 1;
			    } else
			    {
				    oneLinePix += (fontSize + 2) / fontSize;
			    }
		    } else
		    {
			    oneLinePix += (fontSize + 2) / fontSize;
		    }
	    } else if ((regSize_8.test(c) && !bold) || (regSize_8_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize + 4) / fontSize;
	    } else if ((regSize_9.test(c) && !bold) || (regSize_9_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize + 6) / fontSize;
	    } else if ((regSize_10.test(c) && !bold) || (regSize_10_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize + 8) / fontSize;
	    } else if ((regSize_11.test(c) && !bold) || (regSize_11_b.test(c) && bold))
	    {
		    oneLinePix += (2 * fontSize - 2) / fontSize;
	    } else if (regSize_12.test(c))
	    {
		    oneLinePix += 2;
		    if (c != "M" && bold) f = 1;
	    } else if (c == "&" && !bold)
	    {
		    oneLinePix += (fontSize + 4.2) / fontSize;
	    } else if (c == "<")
	    {
		    oneLinePix += (fontSize + 0.6) / fontSize;
	    } else if (/[…]/.test(c))
	    {
		    if (_browser.IE8)
		    {
			    oneLinePix += 2;
		    } else
		    {
			    if (bold)
			    {
				    oneLinePix += 13 / 6;
			    } else
			    {
				    oneLinePix += 2;
			    }
		    }
	    } else
	    {
		    oneLinePix += 2;
	    }
	    return (fontSize + f) * oneLinePix / 2;
    },
    computeIE14 : function(c, fontSize, bold)
    {
	    var regSize_3 = /[ij':|]/;// (fontSize-8)/fontSize 不加粗如12pxfontSize
	    // 就是2
	    var regSize_3_b = /[|·]/;
	    var regSize_4 = /[t\\,;•·\`.\/]/;// (fontSize-6)/fontSize
	    // 不加粗如12pxfontSize 就是 3
	    var regSize_4_b = /[ij|\'\\,.\/]/;// (fontSize-6)/fontSize 加粗
	    var regSize_5 = /[rfI"\(\)\-\[\]]/; // (fontSize-4)/fontSize
	    // 不加粗如12pxfontSize 就是 4
	    var regSize_5_b = /[tf\`\(\)\-\[\]:;]/;// (fontSize-4)/fontSize 加粗
	    var regSize_6 = /[easJz^?]/;// 字号的(fontSize-2)/fontSize不加粗 如12pxfontSize
	    // 就是5px
	    var regSize_6_b = /[rsIc•{}z]/;// (fontSize-2)/fontSize加粗
	    var regSize_7 = /[pyqgxcuodshkvbn#*_{}1234567890$]/; // size是字号的一半不加粗的情况
	    // 如12pxfontSize
	    // 就是6px
	    var regSize_7_b = /[qeyvopadgxb~#*_?1234567890J$]/;// size是字号的一半加粗的情况
	    var regSize_8 = /[EPFZB+=>×~S]/;// (fontSize+2)/fontSize
	    // 不加粗如12pxfontSize 就是 7
	    var regSize_8_b = /[uhTnEPSZF^+=>×"]/;// (fontSize+2)/fontSize 加粗
	    var regSize_9 = /[RTYAUHKCV]/;// (fontSize+4)/fontSize
	    // 不加粗如12pxfontSize 就是 8
	    var regSize_9_b = /[wkUNB]/;// (fontSize+4)/fontSize 加粗
	    var regSize_10 = /[QODGXN]/;// (fontSize+6)/fontSize 不加粗如12pxfontSize 就是
	    // 9
	    var regSize_10_b = /[DGYRAVHXKC]/;// (fontSize+6)/fontSize 加粗
	    var regSize_11 = /[mw]/;
	    var regSize_11_b = /[QO]/;
	    var regSize_12 = /[M%]/;
	    var regSize_12_b = /[mM]/;
	    var regSize_13 = /[@W]/;
	    var regSize_13_b = /[@]/;
	    var regSize_14 = /[W%【】｛｝《》～！＠＃￥％＆（）]|[\u4e00-\u9fa5]/;

	    var oneLinePix = 0;
	    var f = 0;
	    if (c == " ")
	    {
		    oneLinePix += (fontSize - 6) / fontSize;
		    // oneLinePix +=1;
	    } else if ((regSize_3.test(c) && !bold) || (regSize_3_b.test(c) && bold))
	    {
		    if (_browser.IE6)
		    {
			    if (c == "·")
			    {
				    oneLinePix += 2;
				    if (bold) f = 1;
			    } else
			    {
				    oneLinePix += (fontSize - 8) / fontSize;
			    }
		    } else
		    {
			    oneLinePix += (fontSize - 8) / fontSize;
		    }
	    } else if ((regSize_4.test(c) && !bold) || (regSize_4_b.test(c) && bold))
	    {
		    if (_browser.IE6)
		    {
			    if (c == "·")
			    {
				    oneLinePix += 2;
				    if (bold) f = 1;
			    } else
			    {
				    oneLinePix += (fontSize - 6) / fontSize;
			    }
		    } else
		    {
			    oneLinePix += (fontSize - 6) / fontSize;
		    }
	    } else if ((regSize_5.test(c) && !bold) || (regSize_5_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize - 4) / fontSize;
	    } else if ((regSize_6.test(c) && !bold) || (regSize_6_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize - 2) / fontSize;
	    } else if ((regSize_7.test(c) && !bold) || (regSize_7_b.test(c) && bold))
	    {
		    oneLinePix += 1;
	    } else if ((regSize_8.test(c) && !bold) || (regSize_8_b.test(c) && bold))
	    {
		    if (_browser.IE6)
		    {
			    if (c == "×")
			    {
				    oneLinePix += 2;
				    if (bold) f = 1;
			    } else
			    {
				    oneLinePix += (fontSize + 2) / fontSize;
			    }
		    } else
		    {
			    oneLinePix += (fontSize + 2) / fontSize;
		    }
	    } else if ((regSize_9.test(c) && !bold) || (regSize_9_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize + 4) / fontSize;
	    } else if ((regSize_10.test(c) && !bold) || (regSize_10_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize + 6) / fontSize;
	    } else if ((regSize_11.test(c) && !bold) || (regSize_11_b.test(c) && bold))
	    {
		    oneLinePix += (fontSize + 8) / fontSize;
	    } else if ((regSize_12.test(c) && !bold) || (regSize_12_b.test(c) && bold))
	    {
		    oneLinePix += (2 * fontSize - 4) / fontSize;
	    } else if ((regSize_13.test(c) && !bold) || (regSize_13_b.test(c) && bold))
	    {
		    oneLinePix += (2 * fontSize - 2) / fontSize;
	    } else if (regSize_14.test(c))
	    {
		    oneLinePix += 2;
		    if (c == "W")
		    {
			    f = 0;
		    } else if (bold)
		    {
			    f = 1;
		    }
	    } else if (c == "&")
	    {
		    if (bold)
		    {
			    oneLinePix += 108 / 70;
		    } else
		    {
			    oneLinePix += 99 / 70;
		    }
	    } else if (c == "<")
	    {
		    oneLinePix += 36 / 35;
	    } else if (/[…]/.test(c))
	    {
		    if (_browser.IE8)
		    {
			    oneLinePix += 2;
		    } else
		    {
			    if (bold)
			    {
				    oneLinePix += 15 / 7;
			    } else
			    {
				    oneLinePix += 2;
			    }
		    }
	    } else
	    {
		    oneLinePix += 2;
	    }
	    return (fontSize + f) * oneLinePix / 2;
    },
    compute : function(c, fontSize, bold)
    {
	    var regChinese = /[\u4e00-\u9fa5]/;
	    var regUpCharacter = /[A-Z]/;
	    var regLowCharacter = /[a-z]/;
	    var regUnderLine = /[_]/;
	    var regModdleLine = /[-]/;
	    var regNumber = /[0-9]/;
	    var regChineseSign = /[·，。＠～！＃％……＆×？：；￥‘’！“”—……、]|(－{2})|(（)|(）)|(【)|(】)|(｛)|(｝)|(《)|(》)/;
	    var regEnglishSign = /[`~!@#$%^\&*=\-_+:;•"',.\<\>?|\\\/\(\)\{\}\[\]]/;
	    var i = 1;
	    if (!regChinese.test(c) && !regChineseSign.test(c))
	    {
		    i = 2;
	    }
	    if (bold) fontSize += i;

	    var oneLinePix = 0;

	    if (c == ' ')
	    {
		    oneLinePix += 1;
	    } else if (regChinese.test(c))
	    {

		    oneLinePix += 2;
	    } else if (regUpCharacter.test(c) || regLowCharacter.test(c) || regNumber.test(c) || regEnglishSign.test(c))
	    {

		    oneLinePix += 1;
	    } else if (regChineseSign.test(c))
	    {
		    oneLinePix += 2;
	    } else
	    {
		    oneLinePix += 2;
	    }

	    return (fontSize / 2) * oneLinePix;
    },
    /**
	 * regEnglishSign 计算字符串占用位置
	 * 
	 * @para s 字符串
	 * 
	 * @return 近似汉字字符数
	 */
    size : function(s, fontSize, bold)
    {
	    if (!isDefined(fontSize)) fontSize = 12;
	    var boldSize = fontSize + (bold ? 1 : 0); // 粗体大小增加一个像素

	    var l = 0;
	    if (s)
	    {
		    var i, n = s.length;
		    for (i = 0; i < n; i++)
		    {
			    var c = s.charAt(i);
			    l += this.charsize(c, fontSize, bold);
		    }
	    }

	    return l / this.charsize("的", fontSize, bold);
	    // return parseInt((l + (boldSize / 2) - 1) / boldSize);
    },

    /**
	 * 计算字符串(纯文本)占用位置, 根据最大字符位置截断字符串, 并且追加 ...
	 * 
	 */
    maxText : function(s, m, fontSize, bold)
    {
	    if (!isDefined(fontSize)) fontSize = 12;
	    var boldSize = fontSize + (bold ? 1 : 0); // 粗体大小增加一个像素
	    var size = m * fontSize;

	    var l = 0; // 计算 3 个.占用的空间
	    if (s)
	    {
		    var i, n = s.length;

		    for (i = 0; i < n; i++)
		    {
			    var c = s.charAt(i);
			    // 判断空格周边是否是中文，英文大写或者？
			    if (c == " " && _browser.IE)
			    {
				    var last = s.charAt(i - 1);
				    var next = s.charAt(i + 1);
				    var reg = /[A-Z]|[\u4e00-\u9fa5]|(－{2})|(（)|(）)|(【)|(】)|(｛)|(｝)|(《)|(》)/;
				    if (reg.test(next) && reg.test(last))
				    {

					    if (bold)
					    {
						    l += this.charsize('a', fontSize, bold) + 1;
					    } else
					    {
						    l += this.charsize(c, fontSize, bold);
					    }

				    } else
				    {
					    l += this.charsize(c, fontSize, bold);
				    }
			    } else
			    {
				    l += this.charsize(c, fontSize, bold);
			    }

			    var suf = this.charsize("…", fontSize, bold);

			    var len = Math.round(l, 100);
			    if (len >= size)
			    {
				    if (((i + 1) >= n) && len == m * fontSize)
				    {
					    var x = s;
				    } else
				    {
					    var x = s.substring(0, i + 1);
					    var length = i + 1;
					    len = 0;
					    for ( var j = x.length - 1; j >= 0; j--)
					    {
						    var str = x.charAt(j);
						    var sl = 0;
						    if (str == " " && _browser.IE)
						    {
							    var last = s.charAt(i - 1);
							    var next = s.charAt(i + 1);
							    var reg = /[A-Z]|[\u4e00-\u9fa5]|(－{2})|(（)|(）)|(【)|(】)|(｛)|(｝)|(《)|(》)/;
							    if (reg.test(next) && reg.test(last))
							    {
								    if (bold)
								    {
									    sl += this.charsize('a', fontSize, bold) + 1;
								    } else
								    {
									    sl += this.charsize(c, fontSize, bold);
								    }

							    } else
							    {
								    sl = this.charsize(str, fontSize, bold);
							    }
						    } else
						    {
							    sl = this.charsize(str, fontSize, bold);
						    }

						    l -= sl;
						    length--;

						    if (Math.round((l + suf), 100) <= size)
						    {
							    break;
						    }
					    }
					    x = s.substring(0, length) + "…";

				    }
				    return x;
			    }

		    }
	    }
	    return s;
    },
    /**
	 * 计算新闻标题(超文本)占用位置, 根据最大字符位置截断字符串, 并且追加 ...
	 * 
	 * 可以处理 <span></span>，<div></div>等成对出现的标签，不成对出现时会有问题 TODO ylk
	 * 
	 * 如：asdf<span class="fr">rews</span>asd截取后可以是asdf<span class="fr">r</span>...
	 * 
	 * 设计描述： 1、先去除所有的html标签，然后调用maxText进行截取得到str； 2、将源字符串按<[^<>]*>分隔，得到数组arr；
	 * 3、在str中依次查找arr中的纯字符串元素，然后和html标签拼接
	 * 
	 * @param s
	 *            字符串
	 * @param m
	 *            最大字符数
	 * @param e
	 *            元素
	 * @param suffix
	 *            必须出现的后缀字符串，比如个数(123)
	 */
    maxHtml : function(s, m, e, suffix)
    {
	    if (!s)
	    {
		    return '';
	    }
	    /*
		 * 保证第一个字符是有效的，而不是<span class="fr">
		 * 
		 * 这么做是因为下面的方法只处理了asdf<span class="fr">rews</span>asd的情况 而没有处理<span
		 * class="fr">rews</span>asd这种情况
		 */
	    s = '1' + s;
	    /**/
	    var fontSize = UC.getFontSize(e) || 12;
	    var bold = UC.getFontBold(e);

	    var noHtmlText = html2text(s);

	    var str = this.maxText(noHtmlText, m, fontSize, bold); // 先取出没有样式的字符串，截取后再根据关键字标红

	    if (suffix) noHtmlText += suffix;
	    if (e) e.title = noHtmlText.substring(1);

	    var x = s.match(new RegExp('(<[^<>]*>)|(.?)', 'g'));
	    /*
		 * x -> arr
		 * 
		 * 下面一段代码的功能是：将['a','b','<span class="fr">','f','g','</span>','s','d','f']
		 * 组装成['ab','<span class="fr">','fg','</span>','sdf']
		 */
	    var arr = [];
	    var par = '';
	    for ( var j = 0; j < x.length; j++)
	    {
		    if (x[j].length == 1)
		    {
			    par += x[j];
		    } else
		    {
			    arr[arr.length] = par;
			    par = '';
			    arr[arr.length] = x[j];
		    }
	    }
	    if (par.length > 0)
	    {
		    arr[arr.length] = par;
	    }
	    /**/
	    var isSub = false;
	    if (str.indexOf('...', str.length - 3) != -1)
	    {
		    // 去掉末尾的省略号
		    str = str.substring(0, str.length - 3);
		    isSub = true;
	    }
	    var span_count = 0;
	    var y = '';
	    var noHtmlSub = ''; // 存放非html标签的字符串,为了和str对比，找出被截取的是哪个元素
	    var len = arr.length / 2;
	    for ( var i = 0; i < len; i++)
	    {
		    if ('/' == arr[2 * i + 1][1])
		    {
			    --span_count;
		    } else
		    {
			    ++span_count;
		    }

		    if (str.indexOf(arr[2 * i], noHtmlSub.length) == noHtmlSub.length)
		    {
			    y += arr[2 * i] + arr[2 * i + 1];
		    } else
		    {
			    var _sub = str.substring(noHtmlSub.length);
			    if (span_count == 0)
			    {
				    // 成对出现时必须加上</span>
				    y += _sub + arr[2 * i + 1];
			    } else
			    {
				    // 最后一个<span>不要
				    y += _sub;
			    }
		    }
		    noHtmlSub += arr[2 * i];
	    }
	    var result = y.substring(1);
	    if (isSub)
	    {
		    result += '...';
	    }
	    if (suffix) result += suffix;
	    if (e) e.innerHTML = result;
	    return result;
    },
    /**
	 * 计算字符串(超文本)占用位置, 根据最大字符位置截断字符串, 并且追加 ...
	 * 
	 * 目前只简单处理了 <span></span>
	 * 
	 * @param s
	 *            字符串
	 * @param m
	 *            最大字符数
	 * @param suffix
	 *            必须出现的后缀字符串，比如个数(123)
	 * @param e
	 *            元素
	 */
    oldMaxHtml : function(s, m, e, suffix)
    {
	    var fontSize = UC.getFontSize(e);
	    var bold = UC.getFontBold(e);
	    var boldSize = fontSize + (bold ? 1 : 0); // 粗体大小增加一个像素

	    if (suffix) m -= UI.size(suffix);

	    if (s)
	    {
		    var a = s.match(new RegExp('(<[^<>]*>)|(.?)', 'g'));
		    if (a)
		    {
			    var span = 0;
			    var k = 0;
			    var l = 0;
			    var i, n = a.length;
			    for (i = 0; i < n; i++)
			    {
				    var x = a[i]; // string
				    if (1 == x.length)
				    {
					    var c = x.charAt(0);
					    l += this.charsize(c, fontSize, bold);
					    if (parseInt((l + (boldSize / 2) - 1) / boldSize) == m)
					    {
						    x = s.substring(0, k + 1);
						    x += ((span > 0) ? '</span>' : '');
						    // 后面要增...所以要回退几个字符位置
						    {
							    // FIXME 这里回退时没有处理 <span>, 需要加上
							    l -= this.charsize(c, fontSize, bold);
							    l += this.charsize('.', fontSize, bold) * 3;
							    l -= this.charsize(x.substring(x.length).charAt(0), fontSize, bold);
							    x = x.substring(0, x.length - 1);
							    if (parseInt((l + 8 - 1) / 11) > m)
							    {
								    l -= this.charsize(x.substring(x.length).charAt(0), fontSize, bold);
								    x = x.substring(0, x.length - 1);
							    }
						    }
						    x += '...';
						    if (e)
						    {
							    if (suffix) s += suffix;
							    e.title = html2text(s);
							    if (suffix) x += suffix;
							    e.innerHTML = x;

							    var xe = e.innerHTML;
							    // 为了解决新闻审核页面，新闻标题关键字标红时 有些情况不显示省略号的问题
							    if (xe.indexOf("</span>") != -1 && xe.indexOf("</span>") == xe.length - 7)
							    {
								    xe += '...';
								    e.innerHTML = xe;
							    }
						    }
						    return x;
					    }
				    } else
				    {
					    if ('/' == x[1])
						    --span;
					    else
						    ++span;
				    }
				    k += x.length;
			    }
		    }

		    if (suffix) s += suffix;
		    if (e) e.innerHTML = s;
		    return s;
	    }
    },
    /**
	 * 获得元素的坐标
	 */
    getPos : function(e)
    {
	    var box;
	    var pos = {};
	    pos.x = 0;
	    pos.y = 0;
	    pos.w = 0;
	    pos.h = 0;
	    pos.wb = 0;
	    pos.hb = 0;

	    if (!e) return pos;

	    pos.w = $MTU.intval(e.style.width);
	    pos.h = $MTU.intval(e.style.height);
	    pos.wb = e.offsetWidth;
	    pos.hb = e.offsetHeight;

	    // IE
	    if (e.getBoundingClientRect)
	    {
		    box = e.getBoundingClientRect();
		    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		    var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		    pos.x = box.left + scrollLeft;
		    pos.y = box.top + scrollTop;
		    return pos;
	    }

	    // gecko
	    if (document.getBoxObjectFor)
	    {
		    box = document.getBoxObjectFor(e);
		    var borderLeft = (e.style.borderLeftWidth) ? parseInt(e.style.borderLeftWidth) : 0;
		    var borderTop = (e.style.borderTopWidth) ? parseInt(e.style.borderTopWidth) : 0;
		    pos.x = box.x - borderLeft;
		    pos.y = box.y - borderTop;
		    return pos;
	    }

	    // // safari & opera
	    // var parent = null;
	    // {
	    // pos = [ e.offsetLeft, e.offsetTop ];
	    // parent = e.offsetParent;
	    // if (parent != e)
	    // {
	    // while (parent)
	    // {
	    // pos.x += parent.offsetLeft;
	    // pos.y += parent.offsetTop;
	    // parent = parent.offsetParent;
	    // }
	    // }
	    // if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 &&
	    // e.style.position == 'absolute'))
	    // {
	    // pos.x -= document.body.offsetLeft;
	    // pos.y -= document.body.offsetTop;
	    // }
	    // }
	    //
	    // if (e.parentNode)
	    // {
	    // parent = e.parentNode;
	    // } else
	    // {
	    // parent = null;
	    // }
	    //	
	    // while (parent && parent.tagName != 'BODY' && parent.tagName !=
	    // 'HTML')
	    // {
	    // pos.x -= parent.scrollLeft;
	    // pos.y -= parent.scrollTop;
	    // if (parent.parentNode)
	    // {
	    // parent = parent.parentNode;
	    // } else
	    // {
	    // parent = null;
	    // }
	    // }

	    return pos;
    },
    getPosRootNode : function(e)
    {
	    var l = 0;
	    var t = 0;
	    var w = $MTU.intval(e.style.width);
	    var h = $MTU.intval(e.style.height);
	    var wb = e.offsetWidth;
	    var hb = e.offsetHeight;
	    while (e.offsetParent)
	    {
		    l += e.offsetLeft + (e.currentStyle ? $MTU.intval(e.currentStyle.borderLeftWidth) : 0);
		    t += e.offsetTop + (e.currentStyle ? $MTU.intval(e.currentStyle.borderTopWidth) : 0);
		    e = e.offsetParent;
	    }
	    l += e.offsetLeft + (e.currentStyle ? $MTU.intval(e.currentStyle.borderLeftWidth) : 0);
	    t += e.offsetTop + (e.currentStyle ? $MTU.intval(e.currentStyle.borderTopWidth) : 0);

	    var obj =
	    {
	        x : l,
	        y : t,
	        w : w,
	        h : h,
	        wb : wb,
	        hb : hb
	    };
	    return obj;

    },
    /***************************************************************************
	 * *获取滚动条高度
	 **************************************************************************/
    getScroll : function()
    {
	    var t, l, w, h;
	    if (document.documentElement && document.documentElement.scrollTop)
	    {
		    t = document.documentElement.scrollTop;
		    l = document.documentElement.scrollLeft;
		    w = document.documentElement.scrollWidth;
		    h = document.documentElement.scrollHeight;
	    } else if (document.body)
	    {
		    t = document.body.scrollTop;
		    l = document.body.scrollLeft;
		    w = document.body.scrollWidth;
		    h = document.body.scrollHeight;
	    }
	    var o =
	    {
	        t : t,
	        l : l,
	        w : w,
	        h : h
	    };
	    return o;
    }
};
/**
 * 界面控制类
 */
var UC =
{
    /**
	 * 设置一组中的 radiobox 中的某个为选中状态，其他为不选中状态
	 * 
	 * @param e
	 *            当前被选中的元素
	 * @param g
	 *            同组的所有元素数组
	 */
    radio : function(e, g)
    {
	    if (g && g.length)
	    {
		    var n = g.length;
		    for ( var i = 0; i < n; i++)
		    {
			    g[i].checked = (e == g[i]);
		    }
	    }
    },
    /**
	 * hide/show element
	 * 
	 * @param e
	 * @param b
	 */
    hide : function(e, b)
    {
	    if (e) e.style.display = b ? 'none' : '';
    },
    /**
	 * 增加样式名称
	 */
    aClass : function(e, s)
    {
	    var c = ('string' == typeof e) ? e : e.className;
	    var a = c.split(' ');
	    var n = a.length;
	    var found = 0;
	    for ( var i = 0; i < n; i++)
	    {
		    if (a[i].toUpperCase() == s.toUpperCase())
		    {
			    found = 1;
			    break;
		    }
	    }
	    if (!found) a[a.length] = s;

	    c = a.join(' ');
	    if ('string' != typeof e) e.className = c;
	    return c;
    },
    /**
	 * 删除样式名称
	 */
    dClass : function(e, s)
    {

	    var c = ('string' == typeof e) ? e : e.className;
	    var a = c.split(' ');
	    for ( var i = 0; i < a.length; i++)
	    {
		    if (a[i].toUpperCase() == s.toUpperCase()) a.splice(i, 1);
	    }

	    c = a.join(' ');
	    if ('string' != typeof e) e.className = c;
	    return c;
    },
    /**
	 * 取消冒泡事件
	 */
    // FIXME 取消冒泡事件 cancelBubble 没有正确实现
    noBubble : function()
    {
	    if (window.event)
	    {
		    window.event.cancelBubble = true;
		    window.event.returnValue = false;
	    } else
	    {
		    // var e = arguments.callee.caller.arguments[0] ;
		    /**
			 * $EVENTObject().preventDefault();
			 * $EVENTObject().stopPropagation();
			 */
	    }
    },
    /**
	 * 显示/隐藏 正在加载图标
	 * 
	 * @param e
	 * @param show
	 * @param b
	 *            是否显示大图标 32 * 32，默认显示小图标
	 * @param noCenter
	 *            去掉center标签
	 */
    showLoading : function(e, hide, b, noCenter, top, bottom)
    {
	    var mt = 100;
	    var mb = 0;
	    if (top && top > 0)
	    {
		    mt = top;
		    mb = 100;
	    }

	    if (bottom && bottom > 0)
	    {
		    mb = bottom;
	    }

	    if (hide)
	    {
		    e.innerHTML = '';
	    } else
	    {
		    var str = '';

		    if (b)
		    {
			    str = '<img style="border:none;margin-top:' + mt + 'px;margin-bottom:' + mb + 'px;" src="'
			            + _sfs("/i/wait.gif") + '" />';
		    } else
		    {
			    str = '<img style="border:none;" src="' + _sfs("/i/load.gif") + '" />';
		    }
		    if (noCenter)
		    {
			    e.innerHTML = str;
		    } else
		    {
			    e.innerHTML = '<center>' + str + '</center>';
		    }
	    }
    },
    /**
	 * 进度条（目前只有大搜索用）
	 * 
	 * @param e
	 * @param hide
	 * @returns
	 */
    showProcess : function(e, hide)
    {
	    if (hide)
	    {
		    e.innerHTML = '';
	    } else
	    {
		    var str = '<div class="pro_bar" style=""><img src="' + _sfs('/i/pro_bar.gif')
		            + '"><div class="text">搜索执行中，请稍等...</div></div>';

		    e.innerHTML = str;
	    }
    },
    /**
	 * 请求拆分后等待下一页的效果（目前只有大搜索用）
	 * 
	 * @param e
	 * @param hide
	 * @returns
	 */
    showWaitNext : function(e, hide)
    {
	    if (hide)
	    {
		    e.innerHTML = '';
	    } else
	    {
		    var str = '<div style="text-align: center;"><img src="' + _sfs('/i/pro_load.gif')
		            + '"><div class="text1">努力加载中，请稍后...</div></div>';

		    e.innerHTML = str;
	    }
    },
    /**
	 * count数的等待效果（目前只有大搜索用）
	 * 
	 * @param e
	 * @param hide
	 * @returns
	 */
    showWaitCount : function(e, hide)
    {
	    if (hide)
	    {
		    e.innerHTML = '';
	    } else
	    {
		    var str = '<img width="12" height="12" src="' + _sfs('/i/filter_loading.gif') + '">';

		    e.innerHTML = str;
	    }
    },
    /**
	 * 显示/隐藏 正在加载图标(用于重要新闻树上的数量显示前的等待状态)
	 * 
	 * @param e
	 * @param show
	 * @param b
	 *            是否显示大图标 32 * 32，默认显示小图标
	 * @param noCenter
	 *            去掉center标签
	 */
    showTreeCountLoading : function(e, hide, noCenter, top)
    {
	    var mt = 0;
	    if (hide)
	    {
		    e.innerHTML = '';
	    } else
	    {
		    var str = '';

		    if (top && top > 0)
		    {
			    str = '<img style="border:none;margin-top:' + top + 'px;" src="' + _sfs("/i/filter_loading.gif")
			            + '" />';
		    } else
		    {
			    str = '<img style="border:none;" src="' + _sfs("/i/filter_loading.gif") + '" />';
		    }
		    if (noCenter)
		    {
			    e.innerHTML = str;
		    } else
		    {
			    e.innerHTML = '<center>' + str + '</center>';
		    }
	    }
    },
    /**
	 * /** 绑定回车事件
	 */
    bindKeyEnter : function(e, f)
    {
	    var a = $A(arguments);
	    a.shift(); // drop parameter e
	    a.shift(); // drop parameter f
	    if (e)
	    {
		    // 注意：IE 下 onkeydown 按下 enter 不会触发，得用 onkeyup
		    e.onkeyup = function(a)
		    {
			    var evt = $EVENT();
			    if (evt.keyCode == 13)
			    {
				    a.splice(0, 0, f); // insert f as first parameter
				    call.apply(null, a);
			    }
		    }.bind(null, a);
	    }
    },
    /**
	 * 滚动位置方法
	 */
    scrollto : function(e)
    {
	    if (e)
	    {
		    var pos = UI.getPos(e);
		    window.scrollTo(pos.x, pos.y);
	    }
    },
    getStyle : function(e, name)
    {
	    if (e && e.currentStyle)
	    {
		    // IE change name from 'font-size' to 'fontSize'
		    var pos = name.indexOf('-');
		    if (pos >= 0)
		        name = name.substring(0, pos) + name.substring(pos + 1, pos + 2).toUpperCase()
		                + name.substring(pos + 2);
	    }

	    var y = '';
	    if (e && e.currentStyle)
		    y = e.currentStyle[name];
	    else if (e && window.getComputedStyle)
		    y = document.defaultView.getComputedStyle(e, null).getPropertyValue(name);
	    else if ((undefined == e) && ('font-size' == name)) y = '12px';
	    return y;
    },
    getStyleSize : function(e, name)
    {
	    var v = this.getStyle(e, name);
	    if (!v) return 0;
	    v = v.substring(0, v.length - 2); // 减去 px 单位字符串
	    return parseInt(v);
    },
    /**
	 * 字体大小
	 * 
	 * @param e
	 * @returns
	 */
    getFontSize : function(e)
    {
	    return this.getStyleSize(e, 'font-size');
    },
    /**
	 * 字体是否加粗了
	 * 
	 * @param e
	 * @returns {Boolean}
	 */
    getFontBold : function(e)
    {
	    var v = this.getStyle(e, 'font-weight');
	    return 'bold' == v || '700' == v;
    } 
};
var Scrollbar = function(id)
{
	this.tool = document.getElementById(id);

	UC.aClass(this.tool, "alpha");

	this.toolTop = 0;
	this.init();

};
Scrollbar.prototype =
{
    cunstructor : Scrollbar,
    /***************************************************************************
	 * *初始化
	 **************************************************************************/
    init : function()
    {
	    // 获取控件位置
	    this.toolTop = this.getToolTop();
	    // 创建iframe
	    if (!_browser.FX)
	    {
		    var ifr = DM.c("iframe");

		    ifr.style.cssText = "width:100%;height:40px;position:absolute;top:0px;left:0px;border:none;z-index:-1;overflow:hidden; opacity: 0; filter:alpha(opacity=0);";
		    ifr.src = 'about:blank';
		    this.tool.appendChild(ifr);
		    // 非火狐设置透明
		    this.tool.style.backgroundColor = 'transparent';
	    }
	    // 判断浏览器是否为ie 6 ，ie6不支持fixed定位
	    if (this.detectionIE())
	    {
		    this.checkPositionIE();
		    this.scrollFixedIE();
	    } else
	    {
		    this.checkPosition();
		    this.scrollFixed();
	    }
    },
    /***************************************************************************
	 * *判断浏览器是否为ie 6
	 **************************************************************************/
    detectionIE : function()
    {
	    var nav = navigator.appVersion;
	    var reg = new RegExp("MSIE 6.0");
	    return reg.test(nav);
    },
    /***************************************************************************
	 * *判断浏览器为ie 6 触发的滚动事件
	 **************************************************************************/
    scrollFixedIE : function()
    {

	    Event.observe(window, 'scroll', this.scrollPositionIE.bind(this), false);
    },
    /***************************************************************************
	 * *判断浏览器为ie 6 更改定位
	 **************************************************************************/
    scrollPositionIE : function()
    {
	    if (this.tool.offsetHeight != 0)
	    {
		    var s = this.getScroll();
		    if (this.getToolTop() != this.toolTop && this.tool.style.position != "absolute")
		        this.toolTop = this.getToolTop();
		    if (s.t > this.toolTop)
		    {
			    this.tool.style.position = "absolute";

			    if (this.tool.offsetParent)
			    {
				    var _top = this.getPos(this.tool.offsetParent).y + 1;
				    this.tool.style.setExpression('top', 'eval(document.documentElement.scrollTop -' + _top
				            + '  ) + "px"');
			    } else
			    {
				    this.tool.style.setExpression('top', 'eval(document.documentElement.scrollTop  ) + "px"');
			    }
			    UC.aClass(this.tool, "toobar_bg");
			    this.tool.parentNode.style.paddingTop = parseInt(this.tool.offsetHeight) + "px";
			    this.tool.parentNode.style.zIndex = 1;
		    } else
		    {
			    this.removeScrollCss();
		    }
	    } else
	    {
		    this.removeScrollCss();

	    }
    },
    /***************************************************************************
	 * *判断浏览器为ie 6 添加定位方式的样式 初始化页面时候
	 **************************************************************************/
    checkPositionIE : function()
    {
	    var s = this.getScroll();
	    if (s.t > this.toolTop)
	    {
		    this.tool.style.position = "absolute";
		    UC.aClass(this.tool, "toobar_bg");
		    if (this.tool.offsetParent)
		    {
			    var _top = this.tool.offsetParent.offsetTop + 1;
			    this.tool.style.setExpression('top', 'eval(document.documentElement.scrollTop -' + _top + '  ) + "px"');
		    } else
		    {
			    this.tool.style.setExpression('top', 'eval(document.documentElement.scrollTop  ) + "px"');
		    }
		    this.tool.parentNode.style.paddingTop = parseInt(this.tool.offsetHeight) + "px";
		    this.tool.parentNode.style.zIndex = 1;
			this.tool.style.zIndex = 10;
	    }

    },
    /***************************************************************************
	 * *判断浏览器为非ie 6 触发的滚动事件
	 **************************************************************************/
    scrollFixed : function()
    {

	    Event.observe(window, 'scroll', this.scrollPosition.bind(this), this);
	    Event.observe(window, 'resize', this.scrollPosition.bind(this));
    },
    /***************************************************************************
	 * *判断浏览器为非ie 6 更改定位
	 **************************************************************************/
    scrollPosition : function()
    {
	    if (this.tool.offsetHeight != 0)
	    {
		    if (this.getToolTop() != this.toolTop && this.getToolTop() != 0)
		    {

			    this.toolTop = this.getToolTop();
		    }
		    var s = this.getScroll();
		    // var i =0 ;
		    if (s.t > this.toolTop)
		    {
			    // var i = _browser.IE7 ? -1:1;
			    var oStyle = this.tool.parentNode.currentStyle ? this.tool.parentNode.currentStyle : window
			            .getComputedStyle(this.tool.parentNode, null);
			    var j = oStyle.border;
			    if (j)
			    {
				    j = oStyle.borderLeftWidth;
				    var i = parseInt(j.substring(0, j.length - 2));
			    } else
			    {
				    var i = _browser.IE7 ? -1 : 0;
			    }

			    /* var i = _browser.IE ? -1:0; */
			    if (this.tool.style.left != (parseInt(this.getPos(this.tool.parentNode).x - s.l + i) + "px"))
			    {

				    this.tool.style.left = parseInt(this.getPos(this.tool.parentNode).x - s.l + i) + "px";
			    }
			    ;
			    if (this.tool.style.position != "fixed")
			    {
				    this.tool.style.position = "fixed";
				    this.tool.style.top = "0px";
				    this.tool.parentNode.style.paddingTop = parseInt(this.tool.offsetHeight) + "px";
				    UC.aClass(this.tool, "toobar_bg");
				    this.tool.parentNode.style.zIndex = 1;
					this.tool.style.zIndex = 10;
			    }
		    } else
		    {

			    this.removeScrollCss();
		    }
	    } else
	    {
		    this.removeScrollCss();
	    }
    },
    /***************************************************************************
	 * *删除滚动工具条样式
	 **************************************************************************/
    removeScrollCss : function()
    {
	    this.tool.style.left = "";
	    this.tool.style.position = "relative";
	    this.tool.parentNode.style.paddingTop = "";
	    this.tool.parentNode.style.zIndex = 0;
	    UC.dClass(this.tool, "toobar_bg");
	    if (_browser.IE6)
	    {
		    this.tool.style.removeExpression('top');
	    }

	    this.tool.style.top = "";
    },
    /***************************************************************************
	 * *判断浏览器为非ie 6 添加定位方式的样式 初始化页面时候
	 **************************************************************************/
    checkPosition : function()
    {

	    var s = this.getScroll();
	    if (s.t > this.toolTop)
	    {
		    this.tool.style.position = "fixed";
		    this.tool.style.top = "0px";
		    UC.aClass(this.tool, "toobar_bg");
		    this.tool.parentNode.style.paddingTop = parseInt(this.tool.offsetHeight) + "px";
		    this.tool.parentNode.style.zIndex = 1;
			this.tool.style.zIndex = 10;
	    }
    },
    /***************************************************************************
	 * *获取滚动条高度
	 **************************************************************************/
    getScroll : function()
    {
	    var t, l, w, h;
	    if (document.documentElement && document.documentElement.scrollTop)
	    {
		    t = document.documentElement.scrollTop;
		    l = document.documentElement.scrollLeft;
		    w = document.documentElement.scrollWidth;
		    h = document.documentElement.scrollHeight;
	    } else if (document.body)
	    {
		    t = document.body.scrollTop;
		    l = document.body.scrollLeft;
		    w = document.body.scrollWidth;
		    h = document.body.scrollHeight;
	    }

	    var o =
	    {
	        t : t,
	        l : l,
	        w : w,
	        h : h
	    };
	    return o;
    },
    /***************************************************************************
	 * *获取滚动条高度
	 **************************************************************************/
    getToolTop : function()
    {

	    var pos = this.getPos(this.tool.parentNode);
	    return pos.y;
    },
    /***************************************************************************
	 * *数字整数化
	 **************************************************************************/
    intval : function(v)
    {
	    v = parseInt(v);
	    return isNaN(v) ? 0 : v;
    },
    /***************************************************************************
	 * *计算窗口位置
	 **************************************************************************/
    getPos : function(e)
    {
	    var l = 0;
	    var t = 0;
	    var w = this.intval(e.style.width);
	    var h = this.intval(e.style.height);
	    var wb = e.offsetWidth;
	    var hb = e.offsetHeight;
	    while (e.offsetParent)
	    {
		    l += e.offsetLeft
		            + (e.currentStyle ? this.intval(e.currentStyle.borderLeftWidth) : this.intval(window
		                    .getComputedStyle(e, null).borderLeftWidth));

		    t += e.offsetTop
		            + (e.currentStyle ? this.intval(e.currentStyle.borderTopWidth) : this.intval(window
		                    .getComputedStyle(e, null).borderLeftWidth));
		    e = e.offsetParent;
	    }
	    l += e.offsetLeft
	            + (e.currentStyle ? this.intval(e.currentStyle.borderLeftWidth) : this.intval(window.getComputedStyle(
	                    e, null).borderLeftWidth));
	    t += e.offsetTop
	            + (e.currentStyle ? this.intval(e.currentStyle.borderTopWidth) : this.intval(window.getComputedStyle(e,
	                    null).borderTopWidth));
	    var o =
	    {
	        x : l,
	        y : t,
	        w : w,
	        h : h,
	        wb : wb,
	        hb : hb
	    };
	    return o;
    }

}; 
//================================Class Browser===============================
//Class Browser
function Browser()
{
	var s = navigator.userAgent;
	this.IE = s.indexOf("MSIE") != -1;
	this.FX = s.indexOf("Firefox") != -1;
	this.MZ = s.indexOf("Mozila") != -1;
	this.OP = s.indexOf("Opera") != -1;
	this.SAFARI = s.indexOf("AppleWebKit") != -1;
	
	this.IE6= s.indexOf("MSIE 6") != -1;
	this.IE7= s.indexOf("MSIE 7") != -1;
	this.IE8= s.indexOf("MSIE 8") != -1;
	this.IE9= s.indexOf("MSIE 9") != -1;
	this.FX2 = s.indexOf("Firefox/2") != -1;
	this.FX3 = s.indexOf("Firefox/3") != -1;
	this.GOOGLE = s.indexOf("Chrome") != -1;
	
	var s2 = navigator.appVersion.toLowerCase();
	this.WIN = s2.indexOf("win") != -1;
	this.MAC = s2.indexOf("mac") != -1;
	
	// 判断操作系统
	this.WIN2000= s.indexOf("NT 5.0") != -1;
	this.XP= s.indexOf("NT 5.1") != -1;
	this.WIN2003= s.indexOf("NT 5.2") != -1;
	this.VISTA= s.indexOf("NT 6.0") != -1;
	this.WIN2008= s.indexOf("NT 6.1") != -1;
	this.WIN7= s.indexOf("NT 7.0") != -1;
	
	this.IPOD = s.indexOf("iPod") != -1;
	this.IPHONE = s.indexOf("iPhone") != -1;
	this.IPAD = s.indexOf("iPad") != -1;
}
//================================Class Browser===============================
var _browser = new Browser();
//================================Class Browser===============================
