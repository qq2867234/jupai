package com.jupai.order.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jupai.order.domain.Order;
import com.jupai.order.persistence.OrderMapper;
import com.jupai.pay.domain.Pay;
import com.jupai.pay.persistence.PayMapper;

@Service
public class OrderService {

	@Autowired
	private OrderMapper orderMapper;
	@Autowired
	private PayMapper payMapper;
	
	/**
	 * 获取订单详情
	 * @param roomId
	 * @param checkInDay
	 * @param checkOutDay
	 * @return
	 */
	public Map<String, Object> getOrderDetail(Integer roomId, String checkInDay, String checkOutDay) {
		return orderMapper.getOrderDetail(roomId, checkInDay, checkOutDay);
	}

	/**
	 * 判断是否可租
	 * @param roomId
	 * @param checkInDay
	 * @param checkOutDay
	 * @return
	 */
	public boolean isCanRent(Integer roomId, String checkInDay, String checkOutDay) {
		int notRentDays = orderMapper.countNotRentDays(roomId, checkInDay, checkOutDay);
		if(notRentDays > 0) return false;
		return true;
	}
	
	/**
	 * 获取订单金额
	 * @param roomId
	 * @param checkInDay
	 * @param checkOutDay
	 * @return
	 */
	public Integer getOrderAmount(Integer roomId, String checkInDay, String checkOutDay) {
		return orderMapper.getOrderAmount(roomId, checkInDay, checkOutDay);
	}
	
	/**
	 * 创建订单
	 * @param order
	 * @return
	 */
	public int createOrder(Order order) {
		return orderMapper.createOrder(order);
	}

	/**
	 * 获取订单列表
	 * @param openid
	 * @return
	 */
	public List<Map<String, Object>> getOrderList(String openid) {
		return orderMapper.getOrderList(openid);
	}

	/**
	 * 获取订单信息
	 * @param orderId
	 * @return
	 */
	public Map<String, Object> getOrderInfo(String orderId) {
		return orderMapper.getOrderInfo(orderId);
	}

	/**
	 * 获取入住指南
	 * @param roomId
	 * @return
	 */
	public Map<String, Object> getCheckInGuide(Integer roomId) {
		return orderMapper.getCheckInGuide(roomId);
	}

	/**
	 * 申请退订
	 * @param orderId
	 * @return
	 */
	public int applyRefund(String orderId) {
		return payMapper.updatePayStatus(orderId, Pay.Status.REFUND_APPLY.value());
	}
	
	/**
	 * 根据订单号来更新房态（预定成功后将房间设为无房）
	 * @param orderId
	 * @return
	 */
	public int updateRoomStatusByOrderId(String orderId) {
		return orderMapper.updateRoomStatusByOrderId(orderId);
	}
	
}
