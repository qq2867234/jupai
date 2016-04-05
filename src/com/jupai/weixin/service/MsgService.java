package com.jupai.weixin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jupai.account.domain.Account;
import com.jupai.account.service.UserCenterOperatorService;
import com.jupai.weixin.domain.template.BaseTemplate;

@Service("MsgService")
public class MsgService {
	
	@Autowired
	private UserCenterOperatorService userCenterOperatorService;
	@Autowired
	private TemplateMessageService templateMessageService;

	/**
	 * 消息推送(短信+微信)
	 * @param zid 		消息接收方zid
	 * @param smsMsg	短信内容（不发送则传null）
	 * @param templateMsg 	微信消息内容（不发送则传null）
	 * @return JSONObject { status, info, [msgid] }
	 */
	public JSONObject sendMsg(Integer zid, String smsContent, BaseTemplate tplMsgObj){
		JSONObject json = new JSONObject();
		Account account = userCenterOperatorService.getAccountByZid(zid);
		if(account == null) {
			json.put("status", 0);
			json.put("info", "账号不存在");
			return json;
		}
		
		// 需要发送微信消息，并且对方已经绑定了微信
		if(tplMsgObj != null && account.getOpenId() != null){
			// 设置消息接收方openid
			tplMsgObj.setToUser(account.getOpenId());
			// 发送微信消息
			JSONObject res = templateMessageService.send(tplMsgObj);
			// 消息发送失败
			if(res.getInteger("errcode") != 0){
				json.put("status", 0);
				json.put("info", res.getString("errmsg"));
				return json;
			}
			// 返回微信的消息id
			json.put("msgid", res.getInteger("msgid"));
		}
		// 成功
		json.put("status", 1);
		json.put("info", "ok");
		return json;
	}
	
}
