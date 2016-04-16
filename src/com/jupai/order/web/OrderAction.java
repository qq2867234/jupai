package com.jupai.order.web;

import java.util.List;
import java.util.Map;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.RedirectResolution;
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
	
	private String orderId;
	
	@SpringBean
	private OrderService orderService;
	
	/**
	 * 订单详情(给用户填写订单信息并支付的页面)
	 * @return
	 */
	public Resolution goToOrderDetailPage() {
		if(roomId == null || checkInDay == null || checkOutDay == null) {
			setAttributeInRequest("info", "操作失败");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/Search.action?goToRoomDetailPage&roomId="+state); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		String openid = getCurrentOpenid();
		if(openid == null) {
			if(code == null || (openid = WeChatApi.getOpenid(code)) == null) {
				setAttributeInRequest("info", "微信授权失败");
				setAttributeInRequest("btn1", "返回");
				setAttributeInRequest("url1", "/Search.action?goToRoomDetailPage&roomId="+state); 
				setAttributeInRequest("num", 1);
				setAttributeInRequest("status", "n");
				return new ForwardResolution("/WEB-INF/weixin/result.jsp");
			}
			setAttributeInSession("openid", openid);
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
		String openid = getCurrentOpenid();
		if(openid == null) {
			if(code == null || (openid = WeChatApi.getOpenid(code)) == null) {
				setAttributeInRequest("info", "微信授权失败");
				setAttributeInRequest("btn1", "返回");
				setAttributeInRequest("url1", "/"); 
				setAttributeInRequest("num", 1);
				setAttributeInRequest("status", "n");
				return new ForwardResolution("/WEB-INF/weixin/result.jsp");
			}
			setAttributeInSession("openid", openid);
		}
		List<Map<String, Object>> orderList = orderService.getOrderList(openid);
		setAttributeInRequest("orderList", orderList);
		return new ForwardResolution("/WEB-INF/order/orderList.jsp");
	}
	
	public Resolution goToCheckInGuidePage() {
		Map<String, Object> guide = orderService.getCheckInGuide(roomId);
		setAttributeInRequest("guide", guide);
		return new ForwardResolution("/WEB-INF/order/checkInGuide.jsp");
	}
	
	/**
	 * 申请退订
	 * @return
	 */
	public Resolution applyRefund() {
		String openid = getCurrentOpenid();
		if(openid == null) {
			return new RedirectResolution("/");
		}
		JSONObject json = new JSONObject();
		if(orderId == null) {
			json.put("status", "-1");
			json.put("info", "订单号为空");
			return jsonStreamingResolution(json);
		}
		int affectedRows = orderService.applyRefund(orderId);;
		if(affectedRows > 0) {
			json.put("status", "1");
			json.put("info", "申请成功");
		} else {
			json.put("status", "-1");
			json.put("info", "申请失败，请重试");
		}
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 查看订单信息
	 * @return
	 */
	@Deprecated
	public Resolution goToOrderInfoPage() {
		String openid = getCurrentOpenid();
		if(openid == null) {
			setAttributeInRequest("info", "操作失败");
			setAttributeInRequest("desc", "请重新从[首页-我的订单]进入查看订单信息");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/"); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		if(orderId == null) {
			setAttributeInRequest("info", "操作失败");
			setAttributeInRequest("desc", "缺少订单编号");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/"); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		// 获取订单信息
		Map<String, Object> order = orderService.getOrderInfo(orderId);
		if(order == null) {
			setAttributeInRequest("info", "操作失败");
			setAttributeInRequest("desc", "订单不存在");
			setAttributeInRequest("btn1", "返回");
			setAttributeInRequest("url1", "/"); 
			setAttributeInRequest("num", 1);
			setAttributeInRequest("status", "n");
			return new ForwardResolution("/WEB-INF/weixin/result.jsp");
		}
		setAttributeInRequest("order", order);
		return new ForwardResolution("/WEB-INF/order/orderInfo.jsp");
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public void setCheckInDay(String checkInDay) {
		this.checkInDay = checkInDay;
	}

	public void setCheckOutDay(String checkOutDay) {
		this.checkOutDay = checkOutDay;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
}
