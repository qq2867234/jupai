package com.jupai.mobile.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.integration.spring.SpringBean;
import net.sourceforge.stripes.validation.ValidationError;
import net.sourceforge.stripes.validation.ValidationErrors;

import com.alibaba.fastjson.JSONObject;
import com.jupai.account.service.UserCenterOperatorService;
import com.jupai.comm.Runtimeconfig;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.weixin.domain.SignPackage;
import com.jupai.weixin.util.CommunicateUtil;

public class SpreadActionBean extends AbstractActionBean {
	private static final long serialVersionUID = 1L;

	/**姓名*/
	public String name;
	/**身份证**/
	public String idNumber;
	/***手机**/
	public String mobile;
	/***微信标识*/
	public String openid;
	
	private String code;
	
	private UserCenterOperatorService ucos;

	/**
	 * 跳转到活动页面
	 * @return status 1-游客 2-已注册未发房 3-已发房
	 */
	public Resolution goToPubListPage() {
		HttpServletRequest request = getContext().getRequest();
		HttpSession session = request.getSession();
		
		// js-sdk配置参数
		String queryString = request.getQueryString();
		String url = request.getRequestURL().toString() + (queryString != null ? ("?"+queryString) : "");
		SignPackage sp = CommunicateUtil.getSignPackage(url);
		request.setAttribute("sp", sp);
		request.setAttribute("appid", Runtimeconfig.WEIXIN_APPID);
		request.setAttribute("domain", Runtimeconfig.DOMAIN);
		
		
		return new ForwardResolution("/WEB-INF/wx/luckyPost_wx.jsp");
	}

	@SpringBean("UserCenterOperatorService")
	public void injectUserCenterOperatorService(UserCenterOperatorService ucos) {
		this.ucos = ucos;
	}

	@Override
	public Resolution handleValidationErrors(ValidationErrors errors) throws Exception {
		StringBuilder message = new StringBuilder();
		JSONObject json = new JSONObject();
		for (List<ValidationError> fieldErrors : errors.values()) {
			for (ValidationError error : fieldErrors) {
				message.append(error.getMessage(getContext().getLocale()));
				message.append("\n");
			}
		}
		json.put("status", "e");
		json.put("info", message.toString());
		StreamingResolution rs = new StreamingResolution("application/json", json.toJSONString());
		rs.setCharacterEncoding("utf-8");
		return rs;
	}
}
