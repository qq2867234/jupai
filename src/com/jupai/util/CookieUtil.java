package com.jupai.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.jupai.account.domain.Account;
import com.jupai.comm.Runtimeconfig;

/**
 * 用于对cookie进行操作的类
 * 
 * @author shao
 * 
 */
public class CookieUtil {
	private static final Integer loginLife = Integer.valueOf(Runtimeconfig.LOGIN_LIFE);
	// 保存cookie时的cookieName
	public final static String cookieDomainName = "jupai";
	// 加密cookie时的网站自定码
	private final static String webKey = "jupai";
	// 设置cookie有效期是两个星期，根据需要自定义
	private final static long cookieMaxAge = 60 * 60 * 24 * loginLife;
	
	/**
	 * 自动登录时保存Cookie到客户端
	 * @param account
	 * @param response
	 * @return
	 */
	public static Cookie saveCookie(Account account, HttpServletResponse response) {
		// cookie的有效期
		long validTime = System.currentTimeMillis() + (cookieMaxAge * 1000);
		// MD5加密用户详细信息
 		String cookieValueWithMd5 = MD5Tools.EncryptionByMD5((account.getLoginId() + ":"+ account.getPassword()+ ":"+ validTime+ ":" + webKey).getBytes());
		// 将要被保存的完整的Cookie值
		String cookieValue = account.getLoginId() + ":" + validTime + ":" + cookieValueWithMd5;
		// 再一次对Cookie的值进行BASE64编码
		String cookieValueBase64 = Base64.encode(cookieValue.getBytes());
		// 开始保存Cookie
		Cookie cookie = null;
		try {
			cookie = new Cookie(cookieDomainName,  URLEncoder.encode(cookieValueBase64, "UTF-8"));
			// 存两年(这个值应该大于或等于validTime)
			cookie.setMaxAge(60 * 60 * 24 * 365 * 2);
			// cookie有效路径是网站根目录
			cookie.setPath("/");
			// 添加HttpOnly，防止Cookie劫持攻击
			cookie.setHttpOnly(true);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		return cookie;
	}

	/**
	 *  用户注销时,清除自动登录的Cookie
	 * @param response
	 */
	public static void clearCookie(HttpServletResponse response) {
		Cookie cookie = new Cookie(cookieDomainName, null);
		cookie.setMaxAge(0);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
	/**
	 * 获取Cookie
	 * @param cookies
	 * @param name
	 * @return
	 */
	public static String getCookie(Cookie[] cookies, String name) {
		if(cookies!=null && cookies.length>0){
			for (int i = 0; i < cookies.length; i++) {
				if (cookies[i].getName().equals(name) && cookies[i].getValue() != null) {
					return cookies[i].getValue();
				}
			}
		}
		return null;
	}
	
	/**
	 * 判断cookie中是否存在某个key
	 * 
	 * @param cookies cookie数组
	 * @param key 键值
	 * @return 存在返回对应的value，不存在返回null
	 */
	public static String isExist(Cookie[] cookies, String key) {
		if(cookies!=null && cookies.length>0){
			for (int i = 0; i < cookies.length; i++) {
				if (cookies[i].getName().equals(key) && cookies[i].getValue() != null) {
					return cookies[i].getValue();
				}
			}
		}
		return null;
	}
	
	/**
	 * 添加Cookie(保存路径为“/”,默认关闭HttpOnly)
	 * 
	 * @param key 键
	 * @param value 值
	 * @param maxAge 保存时间
	 * @param response
	 */
	public static void addCookie(String key, String value, int maxAge, HttpServletResponse response){
		addCookie(key, value, maxAge, "/", false, response);
	}
	
	/**
	 * 添加Cookie(保存时间为一周，保存路径为“/”,默认关闭HttpOnly)
	 * 
	 * @param key 键
	 * @param value 值
	 * @param maxAge 保存时间
	 * @param response
	 */
	public static void addCookie(String key, String value, HttpServletResponse response){
		addCookie(key, value, 604800, "/", false, response);
	}
	
	/**
	 * 添加Cookie(保存路径为“/”)
	 * 
	 * @param key 键
	 * @param value 值
	 * @param maxAge 保存时间
	 * @param isHttpOnly 是否开启HttpOnly
	 * @param response
	 */
	public static void addCookie(String key, String value, int maxAge, boolean isHttpOnly, HttpServletResponse response){
		addCookie(key, value, maxAge, "/", isHttpOnly, response);
	}
	
	/**
	 * 添加Cookie(保存时间为一周，保存路径为“/”)
	 * 
	 * @param key 键
	 * @param value 值
	 * @param isHttpOnly 是否开启HttpOnly
	 * @param response
	 */
	public static void addCookie(String key, String value, boolean isHttpOnly,  HttpServletResponse response){
		addCookie(key, value, 604800, "/", isHttpOnly, response);
	}
	
	/**
	 * 添加Cookie
	 * 
	 * @param key 键
	 * @param value 值
	 * @param maxAge 保存时间
	 * @param path 保存路径
	 * @param response
	 */
	public static void addCookie(String key, String value, int maxAge, String path, boolean isHttpOnly, HttpServletResponse response){
		try {
			Cookie cookie = new Cookie(key, URLEncoder.encode(value, "UTF-8"));
			cookie.setMaxAge(maxAge);
			cookie.setPath(path);
			cookie.setHttpOnly(isHttpOnly);
			response.addCookie(cookie);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 添加Cookie
	 * 
	 * @param key 键
	 * @param value 值
	 * @param maxAge 保存时间
	 * @param path 保存路径
	 * @param response
	 */
	public static void addCookie(String key, String value, int maxAge, String path, HttpServletResponse response){
		try {
			Cookie cookie = new Cookie(key, URLEncoder.encode(value, "UTF-8"));
			cookie.setMaxAge(maxAge);
			cookie.setPath(path);
			response.addCookie(cookie);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public static void removeCookie(Cookie cookie, HttpServletResponse response){
		cookie.setMaxAge(0);
		cookie.setPath("/");
		response.addCookie(cookie);
	}

}
