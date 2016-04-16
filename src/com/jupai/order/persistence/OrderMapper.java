package com.jupai.order.persistence;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jupai.order.domain.Order;

public interface OrderMapper {

	Map<String, Object> getOrderDetail(@Param("roomId")Integer roomId, @Param("checkInDay")String checkInDay, @Param("checkOutDay")String checkOutDay);

	int countNotRentDays(@Param("roomId")Integer roomId, @Param("checkInDay")String checkInDay, @Param("checkOutDay")String checkOutDay);

	Integer getOrderAmount(@Param("roomId")Integer roomId, @Param("checkInDay")String checkInDay, @Param("checkOutDay")String checkOutDay);

	int createOrder(Order order);

	List<Map<String, Object>> getOrderList(@Param("openid")String openid);

	Map<String, Object> getOrderInfo(@Param("orderId")String orderId);

	Map<String, Object> getCheckInGuide(@Param("roomId")Integer roomId);

	int updateRoomStatusByOrderId(@Param("orderId")String orderId);

}
