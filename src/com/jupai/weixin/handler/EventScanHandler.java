package com.jupai.weixin.handler;

import java.util.Map;

import org.apache.log4j.Logger;

import com.jupai.weixin.handler.inter.IRequestHandler;

/**
 * 扫描微信二维码事件处理器
 * @author ChenJs
 * @date 2015-9-24 下午12:19:30
 */
public class EventScanHandler implements IRequestHandler {
	
	private Logger log = Logger.getLogger(EventScanHandler.class);
	
	@Override
	public String process(Map<String, String> requestMap) {
		return "";
	}
	

}
