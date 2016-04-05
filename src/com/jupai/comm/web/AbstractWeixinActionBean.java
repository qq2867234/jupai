package com.jupai.comm.web;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.SimpleMessage;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.validation.ValidationErrorHandler;

import org.apache.log4j.Logger;
import org.springframework.expression.spel.ast.OpPlus;

import com.alibaba.fastjson.JSONObject;
import com.jupai.account.domain.Account;
import com.jupai.account.service.UserCenterOperatorService;
import com.jupai.util.CookieUtil;
import com.jupai.util.MyApplicationContextUtil;
import com.jupai.util.UserTrackUtil;
import com.jupai.weixin.util.WeChatApi;

public abstract class AbstractWeixinActionBean implements ActionBean, Serializable, ValidationErrorHandler {

	private static final long serialVersionUID = -8095032300290603033L;

	public static Logger logger = Logger.getLogger(AbstractWeixinActionBean.class);

	protected static final String ERROR = "/error.jsp";

	protected transient ActionBeanContext context;

	protected void setMessage(String value) {
		context.getMessages().add(new SimpleMessage(value));
	}

	public ActionBeanContext getContext() {
		return context;
	}

	public void setContext(ActionBeanContext context) {
		this.context = context;
	}

	/**
	 * checkLoginStatusForLocal方法简介
	 * <p>用于本地判断用户是否登录
	 * @return boolea 如果session中有值则返回 <b>true</b> 否则返回<b>false</b>
	 * */
	protected boolean checkLoginStatusForLocal() {
		Account account = (Account) getAttributeFromSession("account");
		if (account == null) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * getCurrentAccount方法简介
	 * <p>用户获取当前登录用户的信息
	 * @param Account
	 * @see Account
	 * */
	protected Account getCurrentAccount() {
		Account account = (Account) getAttributeFromSession("account");
		return account;
	}

	/**
	 * getCurrZid方法简介
	 * <p>获取session中的zid
	 * @retrun Integer 当前登录用户的zid
	 * */
	protected Integer getCurrZid() {
		Integer zid = null;
		Account account = (Account) getAttributeFromSession("account");
		if (account != null) {
			zid = account.getZid();
		} else {
			zid = null;
		}
		return zid;
	}

	/***
	 * getCurrRole方法简介
	 * <p>获得当前用户的角色
	 * @return
	 */
	protected Byte getCurrRole() {
		Byte role = null;
		Account account = (Account) getAttributeFromSession("account");
		if (account != null) {
			role = account.getRole();
		} else {
			role = null;
		}
		return role;
	}

	/**
	 * getHomeHighNumber方法简介
	 * <p>获得房产图片的动态路径
	 * @return
	 */
	protected String getHomeHighNumber(Long HomeId) {
		String hPath = String.valueOf(HomeId / 1000);
		return hPath;
	}

	/**
	 * setAttributeInRequest方法简介
	 * <p>向request中存储数据
	 * @param key 
	 * @param value
	 */
	protected void setAttributeInRequest(String key, Object value) {
		getContext().getRequest().setAttribute(key, value);
	}

	/**
	 * setAttributeInSession方法简介
	 * <p>向request中存储数据
	 * @param key
	 * @param value
	 */
	protected void setAttributeInSession(String key, Object value) {
		getContext().getRequest().getSession().setAttribute(key, value);
	}

	/***
	 * getAttributeFromRequest方法简介
	 * <p>从request中取数据
	 * @param key
	 * @return Object
	 */
	protected Object getAttributeFromRequest(String key) {
		return getContext().getRequest().getAttribute(key);
	}

	/***
	 * getAttributeFromSession方法简介
	 * <p>从session中取数据
	 * @param key
	 * @return Object
	 */
	protected Object getAttributeFromSession(String key) {
		return getContext().getRequest().getSession().getAttribute(key);
	}

	/***
	 * removeAttributeFromRequest方法简介
	 * <p>从request中删除数据
	 * @param key
	 */
	protected void removeAttributeFromRequest(String key) {
		getContext().getRequest().removeAttribute(key);
	}

	/***
	 * removeAttributeFromRequest方法简介
	 * <p>从session中删除数据
	 * @param key
	 */
	protected void removeAttributeFromSession(String key) {
		getContext().getRequest().getSession().removeAttribute(key);
	}

	/**
	 * 更新cookie
	 */
	public void updateCookie(String key, String value) {
		CookieUtil.addCookie(key, value, -1, "/", getContext().getResponse());
	}

	/**
	 * 返回json
	 * @param JSONObject
	 * @return StreamingResolution
	 */
	public StreamingResolution jsonStreamingResolution(JSONObject json) {
		StreamingResolution rs = new StreamingResolution("application/json", json.toJSONString());
		rs.setCharacterEncoding("utf-8");
		return rs;
	}

	/**
	 * 返回json
	 * @param jsonString
	 * @return StreamingResolution
	 */
	public StreamingResolution jsonStreamingResolution(String jsonString) {
		StreamingResolution rs = new StreamingResolution("application/json", jsonString);
		rs.setCharacterEncoding("utf-8");
		return rs;
	}

	/**
	 * 返回成功json
	 * @param info
	 * @return StreamingResolution {"status":"y/n", "info":"content"}
	 */
	public StreamingResolution jsonSuccessStreamingResolution(String info) {
		if (info.startsWith("{")) {
			StreamingResolution rs = new StreamingResolution("application/json", "{\"status\":\"y\", \"info\":" + info + "}");
			rs.setCharacterEncoding("utf-8");
			return rs;
		} else {
			StreamingResolution rs = new StreamingResolution("application/json", "{\"status\":\"y\", \"info\":\"" + info + "\"}");
			rs.setCharacterEncoding("utf-8");
			return rs;
		}
	}

	/**
	 * 返回失败json
	 * @param info
	 * @return StreamingResolution {"status":"y/n", "info":"content"}
	 */
	public StreamingResolution jsonFailureStreamingResolution(String info) {
		StreamingResolution rs = new StreamingResolution("application/json", "{\"status\":\"n\", \"info\":\"" + info + "\"}");
		rs.setCharacterEncoding("utf-8");
		return rs;
	}

	/**
	 * 返回500状态码
	 * @param res
	 * @return
	 */
	public StreamingResolution status500(HttpServletResponse res) {
		res.setStatus(500);
		return null;
	}
	
	private String code;
	private String openid;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	/**
	 * 使用微信的OAuth授权来获取用户zid
	 * <p> 注：该方法仅使用于 【微信网页授权获取用户openid】 中，作为重定向url的方法内才可调用
	 * <p> 1. 先使用code到微信换取openid
	 * <p> 2. 再使用openid到数据库中查询Account记录 
	 * @return 
	 * 	status= 0，不是来自微信，并且未登录
	 * 	stauts= 1，返回zid
	 * 	status= 2，未绑定微信
	 * 	status=-1，异常情况 
	 */
	protected Map<String, Object> getZidUseWeixinOAuth() {
		Map<String, Object> result = new HashMap<String, Object>();
		// 先从session中获取zid
		Integer zid = getCurrZid();
		// session中已有zid，直接返回
		if(zid != null) {
			result.put("status", "1");
			result.put("zid", zid);
			Account account = getCurrentAccount();
			// 未绑定微信，并且可以拿到openid时，自动绑定微信
			if(account.getOpenId() == null && code != null) {
				openid = WeChatApi.getOpenid(code);
				if (openid != null) {
					((UserCenterOperatorService) MyApplicationContextUtil.getContext().getBean("UserCenterOperatorService")).bindOpenid(zid, openid, true);
				}
			}
			return result;
		}
		// 不是来自微信
		if(UserTrackUtil.isPCOrMobileOrWechat(getContext().getRequest()) != 3) {
			result.put("status", "0");
			return result;
		}
		// openid 和 微信传过来的授权code 都为空
		if(openid == null && code == null) {
			result.put("status", "-1");
			return result;
		}
		// code 不为空
		if(openid == null && code != null) {
			// 调用微信接口，使用 code 获取用户 openid
			openid = WeChatApi.getOpenid(code);
		}
		logger.debug("openid="+openid);
		if (openid == null) {
			result.put("status", "-1");
			return result;
		}
		// 根据 openid 获取 Account 
		Account account = ((UserCenterOperatorService) MyApplicationContextUtil.getContext().getBean("UserCenterOperatorService")).getAccountByOpenid(openid);
		logger.debug("account="+account);
		// 未绑定微信
		if(account == null) {
			result.put("status", "2");
			result.put("openid", openid);
			return result;
		}
		// 将account放入session，以便下次使用
		setAttributeInSession("account", account);
		// 返回zid
		result.put("status", "1");
		result.put("zid", account.getZid());
		return result;
	}
	
}
