package com.jupai.weixin.web;

import java.net.URLDecoder;

import net.sourceforge.stripes.action.RedirectResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;
import net.sourceforge.stripes.validation.ValidationErrors;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.data.redis.core.RedisTemplate;

import com.alibaba.fastjson.JSONObject;
import com.jupai.account.domain.Account;
import com.jupai.account.service.UserCenterOperatorService;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.weixin.domain.template.MsgSystemNotice;
import com.jupai.weixin.service.GetWTokenAndJSTicket;
import com.jupai.weixin.service.MsgService;
import com.jupai.weixin.service.WeixinService;
import com.jupai.weixin.util.CommunicateUtil;

public class WeixinActionBean extends AbstractActionBean {

	private static final long serialVersionUID = 1613074147706355730L;
	
	private Logger log = Logger.getLogger(WeixinActionBean.class);
	
	@SpringBean
	private RedisTemplate<String, Object> redisTemplate;

	private WeixinService weixinService;
	@SpringBean("WeixinService")
	public void injectWeixinService(WeixinService weixinService) {
		this.weixinService = weixinService;
	}
	private MsgService msgService;
	@SpringBean("MsgService")
	public void injectMsgService(MsgService msgService) {
		this.msgService = msgService;
	}
	private UserCenterOperatorService ucos; 
	@SpringBean("UserCenterOperatorService")
	public void injectUserCenterOperatorService(UserCenterOperatorService ucos) {
		this.ucos = ucos;
	}
	
	private int pid;
	
	/**
	 * 判断是否已关注真格租房微信公众号
	 * @return
	 */
	public Resolution isSubscribe() {
		JSONObject json = new JSONObject();
		if(!checkLoginStatusForLocal()) {
			return new RedirectResolution("/");
		}
		Integer zid = getCurrZid();
		String openId = ucos.getUserOpenid(zid);
		if(StringUtils.isBlank(openId) || (StringUtils.isNotBlank(openId) && !weixinService.isSubscribe(openId))) {
			//需要绑定微信
			json.put("status", "n");
		} else {
			json.put("status", "y");
		}
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 判断是否已关注真格租房微信公众号
	 * @return
	 */
	public Resolution isSubscribe2() {
		JSONObject json = new JSONObject();
		String openid = null;
		Account account = getCurrentAccount();
		if(account != null && account.getOpenId() != null) {
			openid = account.getOpenId();
		} else {
			openid = (String) getAttributeFromSession("openid");
		}
		if(StringUtils.isBlank(openid) || (StringUtils.isNotBlank(openid) && !weixinService.isSubscribe(openid))) {
			//需要绑定微信
			json.put("status", "n");
		} else {
			json.put("status", "y");
		}
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 获取微信绑定二维码
	 * @return 
	 * 		{"status":"y", "url", "二维码图片链接"}
	 * 		{"status":"n", "info", "失败原因"}
	 */
	public Resolution getWeixinBindQrCode(){
		Integer zid = getCurrZid();
		// 未登录
		if(zid == null){
			return jsonFailureStreamingResolution("未登录或者登录已超时");
		}
		JSONObject json = weixinService.getQRCodeForWeixinBind(zid);
		return jsonStreamingResolution(json);
	}
	
	
	private Integer toZid;
	private String first;
	// 发件人
	private String keyword1; 
	// 内容
	private String keyword2;
	// 备注
	private String remark;
	/**
	 * 发送审核通知（后台审核完成后调用）
	 * @return
	 */
	public Resolution sendVerifyNoticeWebService() {
		// 20160121 add 推送微信通知
		try {
			MsgSystemNotice msg = new MsgSystemNotice();
			first = URLDecoder.decode(first, "UTF-8");
			msg.setFirst(first);
			msg.setKeyword1(URLDecoder.decode(keyword1, "UTF-8"));
			msg.setKeyword2(URLDecoder.decode(keyword2, "UTF-8"));
			if(remark != null)
				msg.setRemark(URLDecoder.decode(remark, "UTF-8"));
//			String smsContent = "你发布的房源已审核通过。活动码为："+first.substring(first.indexOf("：")+1, first.indexOf("，"))+"，2016年4月15日16点整公布结果，祝好运！";
			return jsonStreamingResolution(msgService.sendMsg(toZid, null, msg));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Resolution refresh() {
		getWTokenAndJSTicket.getAll();
		return jsonStreamingResolution(CommunicateUtil.accessToken.getToken());
	}
	
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public Integer getToZid() {
		return toZid;
	}

	public void setToZid(Integer toZid) {
		this.toZid = toZid;
	}

	public String getFirst() {
		return first;
	}

	public void setFirst(String first) {
		this.first = first;
	}

	public String getKeyword1() {
		return keyword1;
	}

	public void setKeyword1(String keyword1) {
		this.keyword1 = keyword1;
	}

	public String getKeyword2() {
		return keyword2;
	}

	public void setKeyword2(String keyword2) {
		this.keyword2 = keyword2;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public Resolution handleValidationErrors(ValidationErrors arg0) throws Exception {
		return null;
	}
	
	private GetWTokenAndJSTicket getWTokenAndJSTicket;
	@SpringBean("GetWTokenAndJSTicket")
	public void injectGetWTokenAndJSTicket(GetWTokenAndJSTicket getWTokenAndJSTicket) {
		this.getWTokenAndJSTicket = getWTokenAndJSTicket;
	}

}
