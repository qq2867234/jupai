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
	 * 获取当前用户的openid
	 * @return
	 */
	protected String getCurrentOpenid() {
		return (String) getContext().getRequest().getAttribute("openid");
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
