package com.jupai.weixin.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jupai.comm.Runtimeconfig;
import com.jupai.weixin.domain.template.BaseTemplate;
import com.jupai.weixin.domain.template.MsgContactNotice;
import com.jupai.weixin.domain.template.MsgProgressStateNotice;
import com.jupai.weixin.domain.template.MsgSystemNotice;
import com.jupai.weixin.domain.template.MsgVerifyNotice;
import com.jupai.weixin.util.WeChatApi;

@Service("TemplateMessageService")
public class TemplateMessageService {
	
    /**
     * 发送模板消息 统一接口
     * @param msg	消息内容
     * @return	{"errcode":0,"errmsg":"ok","msgid":401102349} 
     * 			如果要保证消息100%送达，需要将msgid记录下来，然后接收微信关于是否发送成功的通知，来决定是否重新发送
     */
    public JSONObject send(BaseTemplate msg) {
    	// 租房流程状态提醒
    	if(msg instanceof MsgProgressStateNotice){
    		return sendProgressStateChangeNotice((MsgProgressStateNotice) msg); 
    	}
    	// 联系人通知
    	if(msg instanceof MsgContactNotice){
    		return sendContactNotice((MsgContactNotice) msg); 
    	}
    	// 审核结果通知
    	if(msg instanceof MsgVerifyNotice){
    		return sendVerifyNotice((MsgVerifyNotice) msg); 
    	}
    	// 审核结果通知
    	if(msg instanceof MsgSystemNotice){
    		return sendSystemNotice((MsgSystemNotice) msg); 
    	}
    	JSONObject res = new JSONObject();
    	res.put("errcode", 1);
    	res.put("errmsg", "消息对象不符合要求");
    	return res;
    }
    
	/**
	 * 租房流程状态提醒
	 * @param apply
	 * @return
	 */
	public JSONObject sendProgressStateChangeNotice(MsgProgressStateNotice msg){
    	// 组装要发送的信息
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("touser", msg.getToUser()); // 接收方的openid
		param.put("template_id", Runtimeconfig.TEMPLATE_PROGRESS_STATE_NOTICE); // 模板id
		if(StringUtils.isNotBlank(msg.getUrl())) {
			param.put("url", msg.getUrl()+"&openid="+msg.getToUser());  // 点击详情跳转的地址(自动拼接openid)
		}
		
		// 状态描述
		Map<String, String> first = new HashMap<String, String>();
		first.put("value", msg.getFirst());
		first.put("color", "#000");
		// 姓名
		Map<String, String> keyword1 = new HashMap<String, String>();
		keyword1.put("value", msg.getKeyword1());
		keyword1.put("color", "#000");
		// 手机
		Map<String, String> keyword2 = new HashMap<String, String>();
		keyword2.put("value", msg.getKeyword2()+"\n");
		keyword2.put("color", "#000");
		// 房屋
		Map<String, String> keyword3 = new HashMap<String, String>();
		keyword3.put("value", msg.getKeyword3());
		keyword3.put("color", "#000");
		// 时间
		Map<String, String> keyword4 = new HashMap<String, String>();
		keyword4.put("value", msg.getKeyword4());
		keyword4.put("color", "#000");
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("first", first);
		data.put("keyword1", keyword1);
		data.put("keyword2", keyword2);
		data.put("keyword3", keyword3);
		data.put("keyword4", keyword4);
		
		// 点击详情"xxx"
		if(StringUtils.isNotBlank(msg.getRemark())) {
			Map<String, String> remark = new HashMap<String, String>();
			remark.put("value", "\n"+msg.getRemark());
			remark.put("color", "#000");
			data.put("remark", remark);
		}
		
		param.put("data", data);
		// 发送模板消息
		return WeChatApi.sendTemplateMessage(param);
    }
    

	/**
	 * 添加联系人提醒
	 * @param msg
	 * @return
	 */
	public JSONObject sendContactNotice(MsgContactNotice msg){
    	// 组装要发送的信息
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("touser", msg.getToUser()); // 接收方的openid
//		param.put("template_id", Runtimeconfig.TEMPLATE_CONTACT_NOTICE);
		param.put("template_id", Runtimeconfig.TEMPLATE_SYSTEM_NOTICE);
		if(StringUtils.isNotBlank(msg.getUrl())) {
			param.put("url", msg.getUrl()+"&openid="+msg.getToUser());  // 点击详情跳转的地址(自动拼接openid)
		}
		
		// first
		Map<String, String> first = new HashMap<String, String>();
		first.put("value", msg.getFirst()+"\n");
		// 发件人
		Map<String, String> keyword1 = new HashMap<String, String>();
		keyword1.put("value", msg.getKeyword1());
		keyword1.put("color", "#000");
		// 内容
		Map<String, String> keyword2 = new HashMap<String, String>();
		keyword2.put("value", msg.getKeyword2());
		keyword2.put("color", "#000");
//		// 时间
//		Map<String, String> keyword3 = new HashMap<String, String>();
//		keyword3.put("value", msg.getKeyword3());
//		keyword3.put("color", "#000");
		
		JSONObject data = new JSONObject();
		data.put("first", first);
		data.put("keyword1", keyword1);
		data.put("keyword2", keyword2);
//		data.put("keyword3", keyword3);
		
		// remark (有传入url，则显示)
//		if(StringUtils.isNotBlank(msg.getUrl()) && !StringUtils.isNotBlank(msg.getRemark())) {
		if(StringUtils.isNotBlank(msg.getRemark())) {
			Map<String, String> remark = new HashMap<String, String>();
			remark.put("value", "\n"+msg.getRemark());
			remark.put("color", "#000");
			data.put("remark", remark);
		}
		
		param.put("data", data);
		// 发送模板消息
		return WeChatApi.sendTemplateMessage(param);
    }
	
	/**
	 * 添加联系人提醒
	 * @param msg
	 * @return
	 */
	public JSONObject sendSystemNotice(MsgSystemNotice msg){
    	// 组装要发送的信息
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("touser", msg.getToUser()); // 接收方的openid
		param.put("template_id", Runtimeconfig.TEMPLATE_SYSTEM_NOTICE);
		if(StringUtils.isNotBlank(msg.getUrl())) {
			param.put("url", msg.getUrl()+"&openid="+msg.getToUser());  // 点击详情跳转的地址(自动拼接openid)
		}
		
		// first
		Map<String, String> first = new HashMap<String, String>();
		first.put("value", msg.getFirst()+"\n");
		// 发件人
		Map<String, String> keyword1 = new HashMap<String, String>();
		keyword1.put("value", msg.getKeyword1());
		keyword1.put("color", "#000");
		// 内容
		Map<String, String> keyword2 = new HashMap<String, String>();
		keyword2.put("value", msg.getKeyword2());
		keyword2.put("color", "#000");
		
		JSONObject data = new JSONObject();
		data.put("first", first);
		data.put("keyword1", keyword1);
		data.put("keyword2", keyword2);
		
		// remark
		if(StringUtils.isNotBlank(msg.getRemark())) {
			Map<String, String> remark = new HashMap<String, String>();
			remark.put("value", "\n"+msg.getRemark());
			remark.put("color", "#000");
			data.put("remark", remark);
		}
		
		param.put("data", data);
		// 发送模板消息
		return WeChatApi.sendTemplateMessage(param);
    }
	
	/**
	 * 审核结果通知
	 * @param msg
	 * @return
	 */
	public JSONObject sendVerifyNotice(MsgVerifyNotice msg){
    	// 组装要发送的信息
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("touser", msg.getToUser()); // 接收方的openid
		param.put("template_id", Runtimeconfig.TEMPLATE_VERIFY_NOTICE);
		if(StringUtils.isNotBlank(msg.getUrl())) {
			param.put("url", msg.getUrl()+"&openid="+msg.getToUser());  // 点击详情跳转的地址(自动拼接openid)
		}
		
		// first
		Map<String, String> first = new HashMap<String, String>();
		first.put("value", msg.getFirst()+"\n");
		first.put("color", "#000");
		// 审核内容
		Map<String, String> keyword1 = new HashMap<String, String>();
		keyword1.put("value", msg.getKeyword1());
		keyword1.put("color", "#000");
		// 审核结果
		Map<String, String> keyword2 = new HashMap<String, String>();
		keyword2.put("value", msg.getKeyword2());
		keyword2.put("color", "#000");
		// 客服电话
		Map<String, String> keyword3 = new HashMap<String, String>();
		keyword3.put("value", "400-115-6080");
		keyword3.put("color", "#000");
		
		JSONObject data = new JSONObject();
		data.put("first", first);
		data.put("keyword1", keyword1);
		data.put("keyword2", keyword2);
		data.put("keyword3", keyword3);
		
		// remark
		if(StringUtils.isNotBlank(msg.getRemark())) {
			Map<String, String> remark = new HashMap<String, String>();
			remark.put("value", "\n"+msg.getRemark());
			remark.put("color", "#000");
			data.put("remark", remark);
		}
		
		param.put("data", data);
		// 发送模板消息
		return WeChatApi.sendTemplateMessage(param);
    }
}
