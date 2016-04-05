package com.jupai.comm;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * 将response放入线程变量的过滤器
 * 
 * @author chenjs
 * 
 */
public class ResponseFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain fc)
			throws IOException, ServletException {
		ResponseFactory.setResponse((HttpServletResponse) res);
		fc.doFilter(req, res);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
