package com.jupai.weixin.handler;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.jupai.weixin.handler.inter.IRequestHandler;

/**
 * 接收用户图片消息处理器
 * @author ChenJs
 * @date 2015-9-24 下午12:20:06
 */
@Service
public class MsgImageHandler implements IRequestHandler {
	
	private Logger log = Logger.getLogger(MsgImageHandler.class);
	
	@Override
	public String process(Map<String, String> requestMap) {
    	return "图片上传成功";
	}

}
