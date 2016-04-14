package com.jupai.weixin.web;

import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.data.redis.core.RedisTemplate;

import com.alibaba.fastjson.JSONObject;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.weixin.service.WeixinService;

public class WeixinActionBean extends AbstractActionBean {

	private static final long serialVersionUID = 1613074147706355730L;
	
	private Logger log = Logger.getLogger(WeixinActionBean.class);
	
	@SpringBean
	private RedisTemplate<String, Object> redisTemplate;

	@SpringBean
	private WeixinService weixinService;
	
	private String openid;
	
	/**
	 * 判断是否已关注真格租房微信公众号
	 * @return
	 */
	public Resolution isSubscribe() {
		JSONObject json = new JSONObject();
		if(StringUtils.isBlank(openid) || (StringUtils.isNotBlank(openid) && !weixinService.isSubscribe(openid))) {
			//需要绑定微信
			json.put("status", "n");
		} else {
			json.put("status", "y");
		}
		return jsonStreamingResolution(json);
	}
	
}
