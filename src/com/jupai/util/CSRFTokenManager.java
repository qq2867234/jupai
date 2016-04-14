package com.jupai.util;

import java.util.UUID;

import javax.servlet.http.HttpSession;

public class CSRFTokenManager {
	
	private CSRFTokenManager() {};
	
	/** token参数名称(session) */
	public static final String CSRF_TOKEN = "csrfToken";

	/**
	 * 设置Token
	 * @param session
	 * @return token
	 */
	public static String setCSRFToken(HttpSession session) {
		if(session == null) return null;
		String token = null;
		// cannot allow more than one token on a session - in the case of two requests trying to init the token concurrently
		synchronized (session) {
			token = UUID.randomUUID().toString();
			session.setAttribute(CSRF_TOKEN, token);
		}
		return token;
	}
	
	/**
	 * 读取Token
	 * @param session
	 * @return token
	 */
	public static String getCSRFToken(HttpSession session) {
		if(session == null) return null;
		return (String) session.getAttribute(CSRF_TOKEN);
	}
	
	/**
	 * 清除Token
	 * @param session
	 */
	public static void clearCSRFToken(HttpSession session) {
		if(session == null) return ;
		session.removeAttribute(CSRF_TOKEN);
	}
	
	/**
	 * 检查token (session)
	 * @param session
	 * @param csrfToken
	 * @return
	 */
	public static boolean checkCSRFToken(HttpSession session, String csrfToken){
		System.out.println(csrfToken);
		if(csrfToken == null || !csrfToken.equals(getCSRFToken(session))) return false;
		return true;
	}
	
}
