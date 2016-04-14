package com.jupai.pay.persistence;

import org.apache.ibatis.annotations.Param;

public interface PayMapper {

	/**
	 * 更新支付状态
	 * @param zid
	 * @param orderNo
	 * @return
	 */
	int updatePayStatus(@Param("orderNo")String orderNo, @Param("status")Byte status);
	
	/**
	 * 检查是否已支付
	 * @param orderNo
	 * @return
	 */
	int isCharged(String orderNo);

	/**
	 * 获得已有订单号
	 * @param pid
	 * @param zid
	 * @param channel 
	 * @param status 
	 * @param orderTimeExpire 
	 * @return
	 */
	String getChargeId(@Param("uid")Integer uid, @Param("channel")String channel, @Param("status")byte status, @Param("orderTimeExpire")Integer orderTimeExpire);

}