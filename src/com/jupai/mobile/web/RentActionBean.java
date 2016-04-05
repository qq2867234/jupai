package com.jupai.mobile.web;

import java.util.Map;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.RedirectResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;
import net.sourceforge.stripes.validation.ValidationErrors;

import com.jupai.account.service.UserCenterOperatorService;
import com.jupai.comm.web.AbstractWeixinActionBean;
import com.jupai.weixin.domain.SignPackage;
import com.jupai.weixin.util.CommunicateUtil;

public class RentActionBean extends AbstractWeixinActionBean {

	private static final long serialVersionUID = 3931766640348296218L;
	
	/**
	 * 跳转到发布房源页面
	 * @return
	 */
	public Resolution goToPublishRentPage() {
		Map<String, Object> result = getZidUseWeixinOAuth();
		// 异常情况
		if ("-1".equals(result.get("status").toString())) {
			return new RedirectResolution("/");
		}
		// 不是来自微信并且未登录
		if ("0".equals(result.get("status").toString())) {
			return new RedirectResolution("/");
		}
		// 未绑定微信
		if ("2".equals(result.get("status").toString())) {
			setAttributeInRequest("openid", result.get("openid").toString());
			setAttributeInRequest("redirectUrl", "/Rent.action?goToPublishRentPage");
			return new ForwardResolution("/WEB-INF/wx/login_wx.jsp");
		}
		
		// 微信js-sdk需要的参数
		String queryString = getContext().getRequest().getQueryString();
		String url = getContext().getRequest().getRequestURL().toString() + (queryString != null ? ("?"+queryString) : "");
		SignPackage sp = CommunicateUtil.getSignPackage(url);
		setAttributeInRequest("sp", sp);
		
		return new ForwardResolution("/WEB-INF/wx/rent/addRentalHomeInput_wx.jsp");
	}
	
	
	public Resolution goToIdVerify() {
		if(!checkLoginStatusForLocal()) {
			setAttributeInRequest("redirectUrl", "/Rent.action?goToIdVerify");
			return new ForwardResolution("/WEB-INF/wx/login_wx.jsp");
		}
		return new ForwardResolution("/WEB-INF/wx/rent/id_verify.jsp");
	}
	
	private UserCenterOperatorService userCenterOperatorService;
	@SpringBean("UserCenterOperatorService")
	public void injectUserCenterOperatorService(UserCenterOperatorService userCenterOperatorService) {
		this.userCenterOperatorService = userCenterOperatorService;
	}
	
	@Override
	public Resolution handleValidationErrors(ValidationErrors arg0) throws Exception {
		return null;
	}

}
