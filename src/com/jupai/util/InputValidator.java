package com.jupai.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputValidator {
	
	/***
	 * 过滤html
	 * @param inputString
	 * @return
	 */
	public static String html2Text(String inputString) {
        String htmlStr = inputString; //含html标签的字符串
        String textStr ="";
        java.util.regex.Pattern p_script;
        java.util.regex.Matcher m_script;
        java.util.regex.Pattern p_style;
        java.util.regex.Matcher m_style;
        java.util.regex.Pattern p_html;
        java.util.regex.Matcher m_html;

        try {
            String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script>
            String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style>
            String regEx_html = "<[^>]+>"; //定义HTML标签的正则表达式

            p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
            m_script = p_script.matcher(htmlStr);
            htmlStr = m_script.replaceAll(""); //过滤script标签

            p_style = Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE);
            m_style = p_style.matcher(htmlStr);
            htmlStr = m_style.replaceAll(""); //过滤style标签

            p_html = Pattern.compile(regEx_html,Pattern.CASE_INSENSITIVE);
            m_html = p_html.matcher(htmlStr);
            htmlStr = m_html.replaceAll(""); //过滤html标签

            textStr = htmlStr;

        }catch(Exception e) {
            System.err.println("Html2Text: " + e.getMessage());
        }

        return textStr;//返回文本字符串
    }
	
	/**
	 * replace方法简述
	 * <p>替换掉所传字符串中非法的字符<br>
	 * @param String 需要替换的字符串
	 * @return String 替换后的字符串
	 * */
	public static String replace(String input) {
		if(input == null) {
			return null;
		}
		//String output = input.replaceAll("(?:<|>|%|#)", "");
		input = input.trim();
		String output = input.replaceAll("[<%#*>]", "");
//		html2Text(output);
		return html2Text(output);
	}
	
	/**
	 * replaceForAll方法简述
	 * <p>替换掉所传字符数组中非法的字符<br>
	 * @param String[] 需要替换的字符串数组
	 * @return String[] 替换后的字符串数组
	 * */
	public static String [] replaceForAll(String ... input) {
		//String output = input.replaceAll("(?:<|>|%|#)", "");
		String [] outputs = new String[input.length];
		for (int i = 0; i < input.length; i++) {
			outputs[i] = replace(input[i]);
//			outputs[i] = input[i].replaceAll("[<%#*>]", "");
//			outputs[i] = html2Text(outputs[i]);
		}
		return outputs;
	}
	
	
	public static String replaceAll(String str)
	{
		str=str.replaceAll("[\\-`~!@#$%^&*()+=|{}\\':;\\',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]", "");
		return str;
	}
	public static String removeChineseChar(String chinese)
	{
		chinese=chinese.replaceAll("[\u4e00-\u9fa5]", "");
		return chinese;
	}
	
	/**
	 * 校验日期
	 * @param useDate
	 * @return
	 */
	public static boolean virDate(String useDate){
		try {
			Date now = Calendar.getInstance().getTime();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date use = sdf.parse(useDate);
			if(!now.before(use)) {
				return false;
			}
		} catch (ParseException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	/**
	 * virMobile方法简介
	 * <p>对手机号码进行合法性验证
	 * @param String 手机号码
	 * @return boolean 合法返回<b>true</b> 非法返回<b>false</b>
	 * */
	public static boolean virMobile(String mobile) {	
//		mobile = replace(mobile);
		if(mobile == null) return false;
		Pattern mobileReg = Pattern.compile("^1(3|5|8|4|7)\\d{9}$");
		Pattern chinaMobileReg = Pattern.compile("^1(3[4-9]|4[7]|5[0-2|7-9]|8[7-9])[0-9]{8}$");
		Matcher matcher2 = mobileReg.matcher(mobile);
		Matcher matcher3 = chinaMobileReg.matcher(mobile);
		boolean trust= (matcher2.matches() | matcher3.matches());
		return trust;
	}
	
	/**
	 * virIdNumber方法简介
	 * <p>对身份证号码进行合法性验证
	 * @param String 身份证号码
	 * @return boolean 合法返回<b>true</b> 非法返回<b>false</b>
	 * */
	public static boolean virIdNumber(String idNumber) {
			String idcard = idNumber;
			Map<Byte, String> city = new HashMap<Byte, String>();
			city.put(new Byte("11"), "北京");
			city.put(new Byte("12"), "天津");
			city.put(new Byte("13"), "河北");
			city.put(new Byte("14"), "山西");
			city.put(new Byte("15"), "内蒙古");
			city.put(new Byte("21"), "辽宁");
			city.put(new Byte("22"), "吉林");
			city.put(new Byte("23"), "黑龙江");
			city.put(new Byte("31"), "上海");
			city.put(new Byte("32"), "江苏");
			city.put(new Byte("33"), "浙江");
			city.put(new Byte("34"), "安徽");
			city.put(new Byte("35"), "福建");
			city.put(new Byte("36"), "江西");
			city.put(new Byte("37"), "山东");
			city.put(new Byte("41"), "河南");
			city.put(new Byte("42"), "湖北");
			city.put(new Byte("43"), "湖南");
			city.put(new Byte("44"), "广东");
			city.put(new Byte("45"), "广西");
			city.put(new Byte("46"), "海南");
			city.put(new Byte("50"), "重庆");
			city.put(new Byte("51"), "四川");
			city.put(new Byte("52"), "贵州");
			city.put(new Byte("53"), "云南");
			city.put(new Byte("54"), "西藏");
			city.put(new Byte("61"), "陕西");
			city.put(new Byte("62"), "甘肃");
			city.put(new Byte("63"), "青海");
			city.put(new Byte("64"), "宁夏");
			city.put(new Byte("65"), "新疆");
			city.put(new Byte("71"), "台湾");
			city.put(new Byte("81"), "香港");
			city.put(new Byte("82"), "澳门");
			city.put(new Byte("91"), "国外");
			
			@SuppressWarnings("unused")
			String errorInfo = "";
			boolean pass = true;
			// 号码的长度 15位或18位
			if (idcard.length() != 15 && idcard.length() != 18) {
				errorInfo = "身份证号码长度应该为15位或18位。";
				pass = false;
				return pass;
			}

			// 数字 除最后一位都为数字
			String Ai = "";
			if (idcard.length() == 18) {
				Ai = idcard.substring(0, 17);
			} else if (idcard.length() == 15) {
				Ai = idcard.substring(0, 6) + "19" + idcard.substring(6, 15);
			}
			String numValid = "^\\d+$";
			
			if (Ai.matches(numValid) == false) {
				errorInfo = "身份证15位号码都应为数字 ; 18位号码除最后一位外，都应为数字。";
				pass = false;
				return pass;
			}

			// 出生年月是否有效
			// 出生年月是否有效
			//出生日期的合法性检查 
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
			//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			String ereg = "";
			if (Integer.parseInt(Ai.substring(6, 10)) % 4 == 0
					|| (Integer.parseInt(Ai.substring(6, 10)) % 100 == 0 && Integer.parseInt(Ai.substring(6, 10)) % 4 == 0)) {
				ereg = "^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$";//闰年出生日期的合法性正则表达式 
			} else {
				ereg = "^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$";//平年出生日期的合法性正则表达式 
			}
			if (idcard.matches(ereg) == false) {//测试出生日期的合法性 
				errorInfo = "日期错误.";
				pass = false;
				return pass;
			}
			if (!city.containsKey(new Byte(idcard.substring(0, 2)))) {
				errorInfo = "地址编码错误";
				pass = false;
				return pass;
			} else {
				//18位身份证需要验证最后一位校验位
				if (idcard.length() == 18) {
					//∑(ai×Wi)(mod 11)
					//加权因子
					Integer [] factor = { 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 };
					//校验位
					char [] parity = { '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' };
					int sum = 0;
					int ai = 0;
					int wi = 0;
					for (int i = 0; i < 17; i++) {
						ai = idcard.charAt(i)-48;
						wi = factor[i];
						sum += ai * wi;
					}
					char last = parity[sum % 11];
					if (last != idcard.charAt(17)) {
						errorInfo = "校验位错误";
						pass = false;
						return pass;
					}
				}
			}
			return pass;
	}

}
