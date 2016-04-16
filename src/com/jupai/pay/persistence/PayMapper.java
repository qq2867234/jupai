package com.jupai.pay.persistence;

import org.apache.ibatis.annotations.Param;

public interface PayMapper {

	/**
	 * 更新支付状态
	 * @param zid
	 * @param orderId
	 * @return
	 */
	int updatePayStatus(@Param("orderId")String orderId, @Param("status")Byte status);
	
	/**
	 * 检查是否已支付
	 * @param orderId
	 * @return
	 */
	int isCharged(String orderId);

	int updatePayStatusByChargeId(@Param("chargeId")String chargeId, @Param("status")Byte status);

}