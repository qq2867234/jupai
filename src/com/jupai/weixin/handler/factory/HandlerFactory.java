package com.jupai.weixin.handler.factory;

import java.util.HashMap;
import java.util.Map;

import com.jupai.weixin.handler.EventClickHandler;
import com.jupai.weixin.handler.EventScanHandler;
import com.jupai.weixin.handler.EventSubscribeHandler;
import com.jupai.weixin.handler.MsgImageHandler;
import com.jupai.weixin.handler.inter.IRequestHandler;
import com.jupai.weixin.util.MessageUtil;

/**
 * 请求处理器工厂类
 * @author ChenJs
 * @date 2015-9-24 下午2:02:37
 */
public class HandlerFactory {
	
	/** 存放所有handler的Map */
	private static Map<String, IRequestHandler> handlerMap = new HashMap<String, IRequestHandler>();
	
	/**
	 * 根据handler的名称获取指定handler
	 * @param name
	 * @return
	 */
	public static IRequestHandler get(String name){
		if(!handlerMap.containsKey(name)) {
			switch (name) {
			case MessageUtil.EVENT_TYPE_SCAN: 
				EventScanHandler esh = new EventScanHandler();
				// 扫描微信二维码事件处理器
				handlerMap.put(name, esh);
				break;
			case MessageUtil.EVENT_TYPE_SUBSCRIBE:
				// 订阅事件处理器
				handlerMap.put(name, new EventSubscribeHandler());
				break;
			case MessageUtil.EVENT_TYPE_CLICK:
				// 点击自定义菜单事件处理器
				handlerMap.put(name, new EventClickHandler());
				break;
			case MessageUtil.REQ_MESSAGE_TYPE_IMAGE:
				// 接收用户图片消息处理器
				handlerMap.put(name, new MsgImageHandler());
				break;
			default:
				break;
			}
		}
		return handlerMap.get(name);
	}

}
