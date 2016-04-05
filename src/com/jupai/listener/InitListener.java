package com.jupai.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.jupai.comm.Runtimeconfig;
import com.jupai.weixin.service.GetWTokenAndJSTicket;

/**
 * 监听类，负责各种监听器的启动
 * 
 */
public class InitListener implements ServletContextListener {
	/**公共图片存放路径*/
	private String PUBLIC_IMAGE = Runtimeconfig.PUBLIC_IMAGE;
	
	/**
	 * 初始化
	 */
	public void contextInitialized(ServletContextEvent sce) {
		
		// 初始化系统参数
		ServletContext context = sce.getServletContext();
		context.setAttribute("PUBLIC_IMAGE", PUBLIC_IMAGE);
		
		new GetWTokenAndJSTicket().getAll();
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

}
