package com.jupai.weixin.service;

import org.springframework.stereotype.Service;

import com.jupai.weixin.util.CommunicateUtil;

@Service("GetWTokenAndJSTicket")
public class GetWTokenAndJSTicket {
	
	/**
	 * 获取token
	 */
	public void getToken() {
		CommunicateUtil.accessToken = CommunicateUtil.getAccessToken();  
	}
	
	/**
	 * 获取jsticket
	 */
	public void getJSTicket() {
		CommunicateUtil.jsTicket = CommunicateUtil.getJsApiTicket();
	}
	
	/**
	 * 获取全部
	 */
	public void getAll() {
		CommunicateUtil.accessToken = null;
		getToken();
		getJSTicket();
	}
}
