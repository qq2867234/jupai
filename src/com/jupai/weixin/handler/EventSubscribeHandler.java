package com.jupai.weixin.handler;

import java.util.Map;

import com.jupai.weixin.handler.inter.IRequestHandler;

/**
 * 订阅事件处理器
 * @author ChenJs
 * @date 2015-9-24 下午12:19:30
 */
public class EventSubscribeHandler implements IRequestHandler {
	
	@Override
	public String process(Map<String, String> requestMap) {
       	return "万元寻赏\n寻找北京的幸运房东\n\n欢迎！";  
	}
	
}
