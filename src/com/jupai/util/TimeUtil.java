package com.jupai.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.ocpsoft.prettytime.PrettyTime;
import org.ocpsoft.prettytime.units.JustNow;
import org.ocpsoft.prettytime.units.Millisecond;

/**
 * 时间转化工具类
 * 
 * @author ChenJs
 * @date 2015-3-17 上午11:04:11
 */
public class TimeUtil {

	private final static PrettyTime PRETTY_TIME = new PrettyTime(Locale.CHINESE);
	static{
	  PRETTY_TIME.removeUnit(JustNow.class);
	  PRETTY_TIME.removeUnit(Millisecond.class);
	}
	
	/**
	 * 时间转化(x秒前 x分钟前 x小时前 x天前)
	 * @param timestamp
	 * @return
	 */
	public static String prettyTime(long timestamp){
		return prettyTime(timestamp, "MM-dd HH:mm");
	}
	
	/**
	 * 时间转化(x秒前 x分钟前 x小时前 x天前)
	 * @param date
	 * @return
	 */
	public static String prettyTime(Date date){
		return prettyTime(date.getTime(), "MM-dd HH:mm");
	}
	
	/**
	 * 时间转化(x秒前 x分钟前 x小时前 x天前)
	 * @param date
	 * @param format 一周以前的显示格式
	 * @return
	 */
	public static String prettyTime(Date date, String format){
		return prettyTime(date.getTime(), format);
	}

	/**
	 * 时间转化(x秒前 x分钟前 x小时前 x天前)
	 * 
	 * @param timestamp 时间戳
	 * @param format 一周以前的显示格式
	 * @return 转化后的时间
	 */
	public static String prettyTime(long timestamp, String format) {
		// 一周之内 格式化(1000 * 60 * 60 * 24 * 7 = 604800000)
		if (System.currentTimeMillis() - timestamp < 604800000) {
			String s = PRETTY_TIME.format(new Date(timestamp));
			// return s.replace(" ", "");
			return s;
		}
		// 一周以前 不处理
		else {
			return new SimpleDateFormat(format).format(new Date(timestamp));
		}
	}
	

	/**
	 * 判断是否超过指定的时间间隔（3分钟）
	 * 
	 * @param lastTime 上一次的时间
	 * @param time     当前时间
	 * @return 是或否
	 */
	public static boolean haveTimeGap(long lastTime, long time) {
		int gap = 1000 * 60 * 3;
		return time - lastTime > gap;
	}

	public static void main(String[] args) {
		System.out.println(prettyTime(DateUtil.string2timestamp("2015-10-07", "yyyy-MM-dd").getTime()));
		System.out.println(1000 * 60 * 60 * 24 * 7);
	}
}
