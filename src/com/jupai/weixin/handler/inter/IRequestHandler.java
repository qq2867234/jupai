package com.jupai.weixin.handler.inter;

import java.util.Map;

/**
 * 微信请求处理接口
 * @author ChenJs
 * @date 2015-9-24 下午2:04:04
 */
public interface IRequestHandler {
	
	String process(Map<String, String> requestMap);

}
