package com.jupai.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Random;

/**
 * 编号生成器（订单号、合同号 ... ）
 * @author ChenJs
 * @date 2016-1-18 下午5:53:00
 */
public class IdGenerator {
	
	public static String getOrderId() {
		return new StringBuilder(16).append(getDateTimeString()).append(random3()).toString();
	}
	
	public static String getDateTimeString(){
		return new SimpleDateFormat("yyMMddHHmmss").format(new Timestamp(System.currentTimeMillis()));
	}
	
	public static String getDateString(){
		return new SimpleDateFormat("yyyyMMdd").format(new Timestamp(System.currentTimeMillis()));
	}
	
	public static String getYearMonthString(){
		return new SimpleDateFormat("yyyyMM").format(new Timestamp(System.currentTimeMillis()));
	}
	
	public static String random1(){
		Random random = null;
		try {
			random = SecureRandom.getInstance("SHA1PRNG");
		} catch (NoSuchAlgorithmException e) {
			random = new Random(System.currentTimeMillis());
		}
		int num = random.nextInt(9);
		return ""+num;
	}
	
	public static String random2(){
		Random random = null;
		try {
			random = SecureRandom.getInstance("SHA1PRNG");
		} catch (NoSuchAlgorithmException e) {
			random = new Random(System.currentTimeMillis());
		}
		int num = random.nextInt(99);
		if(num < 10)
			return "0"+num;
		else
			return ""+num;
	}
	
	public static String random3(){
		Random random = null;
		try {
			random = SecureRandom.getInstance("SHA1PRNG");
		} catch (NoSuchAlgorithmException e) {
			random = new Random(System.currentTimeMillis());
		}
		int num = random.nextInt(999);
		if(num < 10)
			return "00"+num;
		else if(num < 100)
			return "0"+num;
		else
			return ""+num;
	}
	
	public static String random4(){
		Random random = null;
		try {
			random = SecureRandom.getInstance("SHA1PRNG");
		} catch (NoSuchAlgorithmException e) {
			random = new Random(System.currentTimeMillis());
		}
		int num = random.nextInt(9999);
		if(num < 10)
			return "000"+num;
		else if(num < 100)
			return "00"+num;
		else if(num < 1000)
			return "0"+num;
		else
			return ""+num;
	}
	
}
