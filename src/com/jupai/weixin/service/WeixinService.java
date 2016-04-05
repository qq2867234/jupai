package com.jupai.weixin.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jupai.weixin.util.WeChatApi;
import com.jupai.weixin.util.WeChatUrl;

@Service("WeixinService")
public class WeixinService {
	
	private Logger log = Logger.getLogger(WeixinService.class);

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	/**
	 * 获取二维码 - 只用于微信绑定
	 * @param zid	
	 * @return
	 */
	public JSONObject getQRCodeForWeixinBind(Integer zid) {
		JSONObject json = new JSONObject();
		// 获取临时二维码的ticket，使用zid作为场景值，有效期10分钟
		JSONObject res = WeChatApi.createTempQRCode(zid, 600);
		// 失败
		if (res == null || res.get("errcode") != null) {
			json.put("status", "n");
			json.put("info", "二维码获取失败，请稍后再试");
			log.error("create weixin qrcode failure! response: " + res.toJSONString());
			return json;
		}
		// 获取显示二维码的微信接口
		String qrcodeUrl = WeChatUrl.qrcodeShow(res.getString("ticket"));
		json.put("status", "y");
		json.put("url", qrcodeUrl);
		return json;
	}
	
	/**
	 * 是否关注微信
	 * @param openid
	 * @return
	 */
	public boolean isSubscribe(String openid) {
		// 获取用户基本信息
		JSONObject json = WeChatApi.getUserInfo(openid);
		int subscribe = json.getIntValue("subscribe");
		if(subscribe == 1) return true;
		return false;
	}
	
}
