package com.jupai.weixin.service;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.jupai.weixin.domain.TextResponseMessage;
import com.jupai.weixin.handler.factory.HandlerFactory;
import com.jupai.weixin.handler.inter.IRequestHandler;
import com.jupai.weixin.util.MessageUtil;
@Service
public class CoreService {
	 /** 
     * 处理微信发来的请求 
     *  
     * @param request 
     * @return 
     */  
    public String processRequest(HttpServletRequest request) {  
        String respMessage = null;  
        Logger log = Logger.getLogger(CoreService.class);
        try {  
            // 默认返回的文本消息内容  
            String respContent = "";  
  
            // 解析xml请求
            Map<String, String> requestMap = MessageUtil.parseXml(request);  
//            System.out.println(request.getServletContext().getRealPath("/"));
            requestMap.put("WebRoot", request.getServletContext().getRealPath("/"));
  
            // 发送方帐号（open_id）  
            String fromUserName = requestMap.get("FromUserName");  
            // 公众帐号  
            String toUserName = requestMap.get("ToUserName");  
            // 消息类型  
            String msgType = requestMap.get("MsgType");  
  
            // 回复文本消息  
            TextResponseMessage textMessage = new TextResponseMessage();  
            textMessage.setToUserName(fromUserName);  
            textMessage.setFromUserName(toUserName);  
            textMessage.setCreateTime(new Date().getTime());  
            textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);  
            
            System.out.println("用户微信号："+requestMap.get("FromUserName"));
            System.out.println("开发者微信号："+requestMap.get("ToUserName"));
            System.out.println("消息类型："+requestMap.get("MsgType"));
            
            IRequestHandler handler = null;
            
            // 文本消息  
            if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {  
                respContent = "hello";  
            }  
            // 图片消息  
            else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_IMAGE)) {  
            	// 获取接收用户图片消息处理器
            	handler = HandlerFactory.get(MessageUtil.REQ_MESSAGE_TYPE_IMAGE);
            	// 处理请求
            	respContent = handler.process(requestMap);
            }  
            // 事件消息
            else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
                // 事件类型  
                String event = requestMap.get("Event");  
                // 订阅事件
                if (event.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) { 
                	// 普通订阅事件
                	if(requestMap.get("EventKey") == null || "".equals(requestMap.get("EventKey"))){
                		// 获取订阅事件处理器
                		handler = HandlerFactory.get(MessageUtil.EVENT_TYPE_SUBSCRIBE);
                		// 处理请求
//                		return handler.process(requestMap);
                		respContent = handler.process(requestMap);
                	}
                	// 带场景值的订阅事件
                	else{
                		System.out.println(requestMap.toString());
                		// 获取扫描二维码事件处理器
                    	handler = HandlerFactory.get(MessageUtil.EVENT_TYPE_SCAN);
                    	// 处理请求
                    	respContent = handler.process(requestMap);
                	}
                }
                // 取消订阅事件 
                else if (event.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {
                    // TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息  
                }  
                // 自定义菜单点击事件
                else if (event.equals(MessageUtil.EVENT_TYPE_CLICK)) {  
                	// 获取自定义菜单点击事件处理器
                	handler = HandlerFactory.get(MessageUtil.EVENT_TYPE_CLICK);
                	// 处理请求
                	respContent = handler.process(requestMap);
                }
                // 扫描带参数的二维码事件
                else if(event.equals(MessageUtil.EVENT_TYPE_SCAN)){
                	// 获取扫描二维码事件处理器
                	handler = HandlerFactory.get(MessageUtil.EVENT_TYPE_SCAN);
                	// 处理请求
                	respContent = handler.process(requestMap);
                }
                // 模板消息发送状态的通知事件
                else if(event.equals(MessageUtil.EVENT_TYPE_TEMPLAT_ESEND_JOB_FINISH)){
                	// 模板消息编号
                	System.out.println("**MsgID**"+requestMap.get("MsgID"));
                	// 模板消息发送状态
                	// success-成功；failed:user block-用户设置拒绝接收公众号消息；failed: system failed-其他原因失败
                	System.out.println("**Status**"+requestMap.get("Status"));
                }
                else {
                	System.out.println("**event**"+event);
                	return "";
                }
            } 
            // 地理位置消息  
            else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_LOCATION)) {  
//                respContent = "别这么着急告诉我你在哪里，让我猜猜！";  
//            	String lat = requestMap.get("Location_X");
//            	String lng = requestMap.get("Location_Y");
//            	String label = requestMap.get("Label");
//            	log.error(lat + "xxxxxx" + lng + "yyyyy" + label);
//            	DistanceResponse disResponse = DistanceUtil.getDistance(lng, lat);
//            	log.error("--------------------------------------------------");
//            	respContent = "您与我的直线距离是：" + disResponse.getResults().getDistance().get(0) + "米 /:heart";
            }  
            // 链接消息  
            else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_LINK)) {  
//                respContent = "不会是1024吧";  
            }  
            // 音频消息  
            else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_VOICE)) {  
//                respContent = "您的语音我收到了！";  
            }  
            else {
            	return "";
            }  
            // 如果回复内容为空串，表示不需要向用户回复消息
            if("".equals(respContent)) {
            	return "success"; // 直接给微信回复success（微信推荐方式）
            }
            textMessage.setContent(respContent);  
            respMessage = MessageUtil.textMessageToXml(textMessage);  
        } catch (Exception e) {  
        	log.error("error", e);
        }  
        return respMessage;  
    }
}
