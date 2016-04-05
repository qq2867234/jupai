package com.jupai.weixin.web;

import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.integration.spring.SpringBean;
import net.sourceforge.stripes.validation.ValidationErrors;

import com.jupai.comm.web.AbstractActionBean;
import com.jupai.weixin.service.CoreService;
import com.jupai.weixin.util.SignUtil;

public class AccessTokenTestActionBean extends AbstractActionBean {
	private static final long serialVersionUID = 1L;
	
	private String signature;
	private String timestamp;
	private String nonce;
	private String echostr;
	
	private CoreService coreService;
	@SpringBean("CoreService")
	public void injectCoreService(CoreService coreService) {
		this.coreService = coreService;
	}
	
	public Resolution checkURL() {
		if (SignUtil.checkSignature(signature, timestamp, nonce)) {
			String method = getContext().getRequest().getMethod();
			// 检测与微信的连接是否成功
			if("GET".equals(method)) {
				StreamingResolution rs = new StreamingResolution("text/xml", echostr);
				rs.setCharacterEncoding("utf-8");
				return rs;
			}
			// 处理微信的请求
			else if("POST".equals(method)) {
				String respMessage = coreService.processRequest(getContext().getRequest());
				StreamingResolution rs = new StreamingResolution("text/xml", respMessage);
				rs.setCharacterEncoding("utf-8");
				return rs;
			}
		}
	    return null; 
	}
	
	public void setSignature(String signature) {
		this.signature = signature;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public void setNonce(String nonce) {
		this.nonce = nonce;
	}

	public void setEchostr(String echostr) {
		this.echostr = echostr;
	}

	@Override
	public Resolution handleValidationErrors(ValidationErrors arg0)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}

