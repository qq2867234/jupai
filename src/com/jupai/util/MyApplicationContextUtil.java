package com.jupai.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class MyApplicationContextUtil implements ApplicationContextAware {

	/*
	 * public static Object getBean(String beanName) {
	 * 
	 * ApplicationContext acx = new
	 * FileSystemXmlApplicationContext("applicationContext.xml"); return
	 * acx.getBean(beanName); }
	 */

	private static ApplicationContext context;// 声明一个静态变量保存

	@Override
	public void setApplicationContext(ApplicationContext context)throws BeansException {
		this.context=context;
	}

	public static ApplicationContext getContext(){
		return context;
	}
}