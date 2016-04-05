package com.jupai.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 日期/时间  工具类
 * @author ChenJs
 * @date 2014-8-25 下午5:09:32
 */
public class DateUtil {
	
	public static String DEFFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	public static String dateFormat(Date date, String fmt){
		try {
			return new SimpleDateFormat(fmt).format(date);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 判断两日期的间隔时间
	 * 
	 * @param before
	 * @param now
	 * @return
	 */
	public static Long getTimeDiff(Date before, Date now) {
		Long timeDiff = null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {

			String s1 = sdf.format(before);
			String s2 = sdf.format(now);
			Date d1 = sdf.parse(s1);
			Date d2 = sdf.parse(s2);
			timeDiff = (d2.getTime() - d1.getTime()) / (3600 * 24 * 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return timeDiff;
	}
	
	/**
	 * 获得当前日期，使用默认格式（yyyy-MM-dd HH:mm:ss）
	 * */
	public static Date getCurrentDate() {
		return getCurrentDate(DEFFAULT_DATE_FORMAT);
	}
	
	/**
	 * 获得当前日期，使用指定格式
	 * @param fmt
	 * @return
	 */
	public static Date getCurrentDate(String fmt) {
		SimpleDateFormat sdf = new SimpleDateFormat(fmt);
		try {
			return sdf.parse(sdf.format(new Date()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 获得当前日期，使用默认格式（yyyy-MM-dd HH:mm:ss）
	 * */
	public static String getCurrentDateForString(){
		return getCurrentDateForString(DEFFAULT_DATE_FORMAT);
	}
	
	/**
	 * 获得当前日期，使用指定格式
	 * @param fmt
	 * @return
	 */
	public static String getCurrentDateForString(String fmt){
		SimpleDateFormat sdf = new SimpleDateFormat(fmt);
		return sdf.format(new Date());
	}
	
	/**
	 * 将日期转化成字符串，使用默认格式（yyyy-MM-dd HH:mm:ss）
	 * @param date
	 * @return
	 */
	public static String date2string(Date date) {
		return date2string(date, DEFFAULT_DATE_FORMAT);
	}

	/**
	 * 将日期转化成字符串，使用指定格式
	 * @param date
	 * @param fmt
	 * @return
	 */
	public static String date2string(Date date, String fmt) {
		try {
			return new SimpleDateFormat(fmt).format(date);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 将字符串转换成日期，使用默认格式（yyyy-MM-dd HH:mm:ss）
	 * @param time
	 * @return
	 */
	public static Date string2date(String time){
		return string2date(time, DEFFAULT_DATE_FORMAT);
	}
	
	/**
	 * 将字符串转换成日期，使用指定格式
	 * @param time
	 * @param fmt
	 * @return
	 */
	public static Date string2date(String time, String fmt) {
		try {
			return new SimpleDateFormat(fmt).parse(time);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 将字符串转化成时间戳，使用默认格式（yyyy-MM-dd HH:mm:ss）
	 * @param time
	 * @return
	 */
	public static Timestamp string2timestamp(String time) {
		return string2timestamp(time, DEFFAULT_DATE_FORMAT);
	}
	
	/**
	 * 将字符串转化成时间戳，使用指定格式
	 * @param time
	 * @param fmt
	 * @return
	 */
	public static Timestamp string2timestamp(String time, String fmt) {
		try {
			return new Timestamp(new SimpleDateFormat(fmt).parse(time).getTime());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 将时间戳转化成字符串，使用默认格式（yyyy-MM-dd HH:mm:ss）
	 * @param timestamp
	 * @return
	 */
	public static String timestamp2string(Timestamp timestamp) {
		return timestamp2string(timestamp, DEFFAULT_DATE_FORMAT);
	}
	
	/**
	 * 将时间戳转化成字符串
	 * @param timestamp
	 * @param fmt
	 * @return
	 */
	public static String timestamp2string(Timestamp timestamp, String fmt) {
		try {
			return new SimpleDateFormat(fmt).format(timestamp);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
