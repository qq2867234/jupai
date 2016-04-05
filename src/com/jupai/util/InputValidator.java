package com.jupai.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
	 * @author 刘子琨 shao
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
	 * @author shao
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
	 * 校验入驻日期
	 * @param useDate
	 * @return
	 * @throws ParseException 
	 */
	public static boolean virUseDate(String useDate) throws ParseException {
		Date now = Calendar.getInstance().getTime();
		SimpleDateFormat sdf = new  SimpleDateFormat("yyyy-MM-dd");
		Date use = sdf.parse(useDate);
		if(!now.before(use)) {
			return false;
		}
		return true;
	}

	/**
	 * 校验每次付几个月的租金
	 * @param payMonth
	 * @return
	 */
	public static boolean virPayMonth(Byte payMonth) {
		if(payMonth != 1 &&  payMonth!= 2 && payMonth != 3 && payMonth != 6 && payMonth!= 12) {
			return false;
		}
		return true;
	}

	/**
	 * 检验租期
	 * @param rentMonth
	 * @return
	 */
	public static boolean virRentMonth(Byte rentMonth) {
		if((rentMonth >=1 && rentMonth <= 12) || (rentMonth == 24 || rentMonth == 36)) {
			return true;
		}
		return false;
	}
}
