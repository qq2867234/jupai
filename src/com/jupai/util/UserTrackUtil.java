package com.jupai.util;

import java.net.InetAddress;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class UserTrackUtil {
	
	public static void main(String[] args) {
		// 1875045485	
		System.out.println(ipToInt("111.194.236.109"));
	}
	
	/**
	 *  获得客户端真实IP地址
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {

		String ip = request.getHeader("Cdn-Src-Ip");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-Real-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_REAL_IP");
		}       
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("X-Forwarded-For");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip.equals("0:0:0:0:0:0:0:1")) {
			ip = "127.0.0.1";
		}
		return ip;

	}// get ip
	
	/**
	 * 将IP转化成Integer
	 * 
	 * @param ip
	 * @return
	 */
	public static Integer ipToInt(String ip) {
		Integer addr = null;
		try {
			// 把IP地址转化为字节数组
			byte[] bytes = InetAddress.getByName(ip).getAddress();

			// 把字节数组转化为整形
			addr = bytes[3] & 0xFF;
			addr |= ((bytes[2] << 8) & 0xFF00);
			addr |= ((bytes[1] << 16) & 0xFF0000);
			addr |= ((bytes[0] << 24) & 0xFF000000);
		} catch (Exception e) {
			System.out.println(ip + " is invalid ip.");
		}
		return addr;
	}
	
	/**
	 * 获取IP地址并转为整数
	 * @return
	 */
	public static Integer getIpAddrToInt(HttpServletRequest request){
		return ipToInt(getIpAddr(request));
	}
	
	/**
	 *  获取用户的操作系统和浏览器
	 * @param request
	 * @return
	 */
	public static String getOSandBrowser(HttpServletRequest request) {
		return request.getHeader("User-Agent");
	}

	/**
	 *  取得用户的Cookies
	 * @param request
	 * @return
	 */
	public static String getAllCookies(HttpServletRequest request) {
		StringBuilder result = new StringBuilder();
		Cookie cookies[] = request.getCookies();
		if (cookies != null) {
			for (int i = 0; i < cookies.length - 1; i++) {
				result.append(cookies[i].getName());
				result.append("=");
				result.append(cookies[i].getValue());
				result.append(",");
			}
			if (result.length() > 1) {
				result.append(cookies[cookies.length - 1].getName());
				result.append("=");
				result.append(cookies[cookies.length - 1].getValue());
			}
		}

		return result.toString();
	}

	/**
	 *  判断是手机还是电脑访问
	 * @param request
	 * @return
	 */
	public static String isPhoneOrComputer(HttpServletRequest request) {
		String[] Agents = { "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod" };
		String flag = "1";
		String userAgent = request.getHeader("User-Agent");
		for (int i = 0; i < Agents.length; i++) {
			if (userAgent.indexOf(Agents[i]) > 0) {
				flag = "2";
				break;
			}
		}
		return flag;
	}
	
	/**
	 * 判断是PC、手机网页还是微信
	 * @param request
	 * @return 1-PC 2-手机网页 3-微信
	 */
	public static byte isPCOrMobileOrWechat(HttpServletRequest request){
		//Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; MI 3W Build/KTU84P) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025489 Mobile Safari/533.1 MicroMessenger/6.3.13.49_r4080b63.740 NetType/WIFI Language/zh_CN
		System.out.println(request.getHeader("User-Agent"));
		if(Pattern.compile(".*Android.*|.*iPhone.*|.*SymbianOS.*|.*Windows Phone.*|.*iPad.*|.*iPod.*",Pattern.CASE_INSENSITIVE).matcher(request.getHeader("User-Agent")).matches()) {
			// 苹果微信 Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13D15 MicroMessenger/6.3.10 NetType/WIFI Language/zh_CN
			// Pattern.compile(".*QQBrowser.*",Pattern.CASE_INSENSITIVE).matcher(request.getHeader("User-Agent")).matches() && 
			if(Pattern.compile(".*MicroMessenger.*",Pattern.CASE_INSENSITIVE).matcher(request.getHeader("User-Agent")).matches()) {
				return 3;
			}
			return 2;
		}
		return 1;
	}
	
}
