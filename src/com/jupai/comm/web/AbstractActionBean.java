package com.jupai.comm.web;

import java.io.Serializable;

import javax.servlet.http.HttpServletResponse;

import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.SimpleMessage;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.validation.ValidationErrorHandler;
import net.sourceforge.stripes.validation.ValidationErrors;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.jupai.account.domain.Account;
import com.jupai.util.CookieUtil;
import com.jupai.weixin.util.WeChatApi;

public abstract class AbstractActionBean implements ActionBean, Serializable, ValidationErrorHandler {

	public static Logger logger = Logger.getLogger(AbstractActionBean.class.getName());
	private static final long serialVersionUID = -1767714708233127983L;

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
	 * 添加提示信息
	 * @param message
	 */
	@Override
	public Resolution handleValidationErrors(ValidationErrors arg0)
			throws Exception {
		return null;
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
	 * getHighNumber方法简介
	 * <p>获得Account用户存储图片的后半部路径
	 * */
	protected String getHighNumber() {
		Integer zid = getCurrZid();
		String zPath = String.valueOf(zid / 10000);
		return zPath;
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
	 * 设置图片上传错误信息
	 * @param message
	 * @param type 1表示上传图片，2表示普通信息
	 * @return
	 */
	protected String getError(String message, int type) {
		JSONObject obj = new JSONObject();
		if (type == 1) {
			obj.put("error", 1);
			obj.put("message", message);
			return obj.toJSONString();
		} else if (type == 2) {
			obj.put("status", "n");
			obj.put("info", message);
			return obj.toJSONString();
		} else if (type == 3) {
			obj.put("status", "e");
			obj.put("info", message);
			return obj.toJSONString();
		} else {
			return "";
		}
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
	
}
