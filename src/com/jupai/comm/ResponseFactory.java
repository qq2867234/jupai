package com.jupai.comm;

import javax.servlet.http.HttpServletResponse;

/**
 * 保存response到线程变量的类
 * 
 * @author chenjs
 * 
 */
public class ResponseFactory {

	private static ThreadLocal<HttpServletResponse> responseLocal = new ThreadLocal<HttpServletResponse>();

	public static HttpServletResponse getResponse() {
		return (HttpServletResponse) responseLocal.get();
	}

	public static void setResponse(HttpServletResponse response) {
		responseLocal.set(response);
	}

}
