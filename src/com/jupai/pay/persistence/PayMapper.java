package com.jupai.pay.persistence;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jupai.pay.domain.Pay;

public interface PayMapper {

	/**
	 * 创建支付订单
	 * @param zid
	 * @param orderNo
	 * @param type
	 * @param amount
	 * @param pid 
	 * @param channel 
	 * @param chargeId 
	 * @param role 
	 * @param cityCode 
	 */
	void addPay(@Param("zid")Integer zid, @Param("orderNo")String orderNo, @Param("type")Byte type, 
			@Param("amount")Float amount, @Param("pid")Integer pid, @Param("channel")String channel,
			@Param("role")Byte role, @Param("chargeId")String chargeId, @Param("cityCode")Integer cityCode);
	
	/**
	 * 更新支付状态
	 * @param zid
	 * @param orderNo
	 * @return
	 */
	int updatePayStatus(@Param("orderNo")String orderNo, @Param("status")Byte status);

	/**
	 *  获得合同中的租金
	 * @param pid
	 * @param zid
	 * @return
	 */
	int getRentPrice(@Param("pid")Integer pid, @Param("zid")int zid);

	/**
	 * 获得已有订单号
	 * @param pid
	 * @param zid
	 * @param channel 
	 * @param status 
	 * @param orderTimeExpire 
	 * @return
	 */
	String getChargeId(@Param("pid")Integer pid, @Param("zid")int zid, @Param("channel")String channel, @Param("status")byte status, @Param("orderTimeExpire")Integer orderTimeExpire);

	/**
	 * 获得订单信息
	 * @param orderNo
	 * @return
	 */
	Map<String, Object> getOderInfo(String orderNo);

	/**
	 * 检查是否已支付
	 * @param orderNo
	 * @return
	 */
	int isCharged(String orderNo);
}