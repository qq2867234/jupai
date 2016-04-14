package com.jupai.order.web;

import java.util.List;
import java.util.Map;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;

import com.alibaba.fastjson.JSONObject;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.order.service.OrderService;
import com.jupai.util.CSRFTokenManager;
import com.jupai.weixin.util.WeChatApi;

public class OrderAction extends AbstractActionBean {

	private static final long serialVersionUID = -1892685003589230920L;
	
	private Integer roomId;
	private String checkInDay;
	private String checkOutDay;
	
	private String code;
	private String state;
	
	@SpringBean
	private OrderService orderService;
	
	/**
	 * 订单详情
	 * @return
	 */
	public Resolution goToOrderDetailPage() {
		if(code == null || roomId == null || checkInDay == null || checkOutDay == null) {
			setAttributeInRequest("info", "操作失败");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/Search.action?goToRoomDetailPage&roomId="+state); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		String openid = WeChatApi.getOpenid(code);
		if(openid == null) {
			setAttributeInRequest("info", "微信授权失败");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/Search.action?goToRoomDetailPage&roomId="+state); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		// 获取订单详情
		Map<String, Object> orderDetail = orderService.getOrderDetail(roomId, checkInDay, checkOutDay);
		if(orderDetail == null) {
			setAttributeInRequest("info", "操作异常");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/Search.action?goToRoomDetailPage&roomId="+state); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		setAttributeInRequest("orderDetail", orderDetail);
		setAttributeInRequest("openid", openid);
		setAttributeInRequest("roomId", roomId);
		setAttributeInRequest("checkInDay", checkInDay);
		setAttributeInRequest("checkOutDay", checkOutDay);
		// 生成csrfToken串
		CSRFTokenManager.setCSRFToken(getContext().getRequest().getSession());
		return new ForwardResolution("/WEB-INF/order/orderDetail.jsp");
	}
	
	/**
	 * 是否可租
	 * @return
	 */
	public Resolution isCanRent() {
		JSONObject json = new JSONObject();
		boolean isCanRent = orderService.isCanRent(roomId, checkInDay, checkOutDay);
		json.put("isCanRent", isCanRent);
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 订单列表
	 * @return
	 */
	public Resolution goToOrderListPage() {
		String openid = null;
		if(code == null || (openid = WeChatApi.getOpenid(code)) == null) {
			setAttributeInRequest("info", "微信授权失败");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/home.jsp"); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		List<Map<String, Object>> orderList = orderService.getOrderList(openid);
		setAttributeInRequest("orderList", orderList);
		return new ForwardResolution("/WEB-INF/order/orderList.jsp");
	}

	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public String getCheckInDay() {
		return checkInDay;
	}

	public void setCheckInDay(String checkInDay) {
		this.checkInDay = checkInDay;
	}

	public String getCheckOutDay() {
		return checkOutDay;
	}

	public void setCheckOutDay(String checkOutDay) {
		this.checkOutDay = checkOutDay;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
