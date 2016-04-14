package com.jupai.order.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jupai.order.domain.Order;
import com.jupai.order.persistence.OrderMapper;

@Service
public class OrderService {

	@Autowired
	private OrderMapper orderMapper;
	
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
	
	public int createOrder(Order order) {
		return orderMapper.createOrder(order);
	}

	public List<Map<String, Object>> getOrderList(String openid) {
		return orderMapper.getOrderList(openid);
	}
	
}
