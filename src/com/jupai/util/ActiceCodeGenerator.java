package com.jupai.util;



public class ActiceCodeGenerator {
	
	public static String generateEmailCode() {
		String code = getNumString(4);
		return code;
	}
	
	public static String generateTelCode() {
	
		String code = getNumString(6);
		return code;
	}
	
	private static char [] chars = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
	private static char [] number = "0123456789".toCharArray();
	
	private static String getNumString(int len) {
		if(len < 4 || len >8) {
			len = 4;
		}
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < len; i++) {
			sb.append(number[random(number.length)]);
		}
		return sb.toString();
	}
	
	/**getString方法简介
	 * <p>随机获得字符串
	 * */
	private static String getString(int len) {
		if(len < 4 || len >8) {
			len = 4;
		}
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < len; i++) {
			sb.append(chars[random(chars.length)]);
		}
		return sb.toString();
	}
	/**
	 * random方法简介
	 * <p>生成随机数
	 * */
	public static int random(int limit) {
		int result = (int)(Math.random() * limit);
		return result;
	}
}