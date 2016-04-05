package com.jupai.weixin.handler;

import java.util.Map;

import com.jupai.weixin.handler.inter.IRequestHandler;

/**
 * 订阅事件处理器
 * @author ChenJs
 * @date 2015-9-24 下午12:19:30
 */
public class EventClickHandler implements IRequestHandler {
	
	@Override
	public String process(Map<String, String> requestMap) {
		String respContent = "请求处理异常，请稍候尝试！";  
		String defaultstr = "敬请期待";
    	// 事件KEY值，与创建自定义菜单时指定的KEY值对应  
        String eventKey = requestMap.get("EventKey");  
        String keys = "checkin,shareInfo,grab";
        Integer zid = null;
        if(keys.contains(eventKey)) {
//        	Account account = checkBindingStatus(fromUserName);
//        	if(!InputValidator.isNotNull(account)) {
//        		respContent = String.format("您还没有绑定真格在线账号，请先绑定<a href=\"http://www.zhengor.com/WeiXinComment.action?goToBind&location=%s&openId=%s\">【立即绑定】</a>", eventKey, fromUserName);
//        	} else {
//        		zid = account.getZid();
//        	}
        }
        if (eventKey.equals("checkin")) {  
            respContent = defaultstr;  
        } else if (eventKey.equals("shareInfo")) {  
        	respContent = String.format("查看您所有的服务小区<a href=\"http://www.zhengor.com/BrokerWeiXin.action?showBrokerServiceResidences&brokerNo=%s\">【立即查看】</a>", zid);  
        } else if (eventKey.equals("grab")) {  
        	respContent = defaultstr; 
        } else if (eventKey.equals("searchAgent")) {  
        	respContent = defaultstr;  
        } else if (eventKey.equals("searchPrice")) {  
        	respContent = defaultstr;  
        } else if(eventKey.equals("cal")) {
        	respContent = String.format("计算器<a href=\"http://www.zhengor.com//mobile/cal\">【立即使用】</a>", zid);
        } else if(eventKey.equals("onlineService")) {
        	respContent = "联系在线客服，请添加微信号zhengor1。";
        }  else {
        	return "";
        } 
        return respContent;
	}
	
}
