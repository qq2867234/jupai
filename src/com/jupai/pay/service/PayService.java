package com.jupai.pay.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jupai.order.persistence.OrderMapper;
import com.jupai.pay.domain.Pay;
import com.jupai.pay.persistence.PayMapper;

@Service("PayService")
public class PayService {
	
	private Logger log = Logger.getLogger(PayService.class);
	
	@Autowired
	private PayMapper payMapper;
	@Autowired
	private OrderMapper orderMapper;
	
	/**
	 * 更新支付状态
	 * @param orderId
	 * @param status
	 * @return
	 */
	@Transactional
	public boolean payCallback(String orderId, Byte status) {
		try {
			// 更新支付状态
			int affectedRows = payMapper.updatePayStatus(orderId, status);
			if (affectedRows == 1) {
				log.info("updatePayStatus success: " + orderId);
				if(status == Pay.Status.PAY_SUCCESS.value()) {
					affectedRows = orderMapper.updateRoomStatusByOrderId(orderId);
					if(affectedRows > 0) {
						log.info("updateRoomStatusByOrderId success: " + orderId);
					} else {
						log.error("updateRoomStatusByOrderId affected rows is zero. orderId=" + orderId);
					}
				}
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderId=" + orderId);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderId="+orderId, e);
			return false;
		}
	}
	
	/**
	 * 支付成功
	 */
	@Transactional
	public boolean chargeSucceeded(String orderId) {
		try {
			// 更新支付状态
			int affectedRows = payMapper.updatePayStatus(orderId, Pay.Status.PAY_SUCCESS.value());
			if (affectedRows == 1) {
				log.info("updatePayStatus success: " + orderId);
				affectedRows = orderMapper.updateRoomStatusByOrderId(orderId);
				if(affectedRows > 0) {
					log.info("updateRoomStatusByOrderId success: " + orderId);
				} else {
					log.error("updateRoomStatusByOrderId affected rows is zero. orderId=" + orderId);
				}
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderId=" + orderId);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderId="+orderId, e);
			return false;
		}
	}
	
	/**
	 * 退款成功
	 */
	public boolean refundSucceeded(String chargeId) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatusByChargeId(chargeId, Pay.Status.REFUND_SUCCESS.value());
			if (affectedRows == 1) {
				log.info("refundSucceeded: chargeId="+chargeId);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. chargeId="+chargeId);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. chargeId="+chargeId, e);
			return false;
		}
	}
	
	/**
	 * 支付失败
	 */
	@Deprecated
	public boolean chargeFailed(String orderId) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatus(orderId, Pay.Status.PAY_FAIL.value());
			if (affectedRows == 1) {
				log.info("chargeSucceeded: "+orderId);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderId="+orderId);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderId="+orderId, e);
			return false;
		}
	}


	/**
	 * 退款失败
	 */
	@Deprecated
	public boolean refundFailed(String orderId) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatus(orderId, Pay.Status.REFUND_FAIL.value());
			if (affectedRows == 1) {
				log.info("refundFailed: "+orderId);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderId="+orderId);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderId="+orderId, e);
			return false;
		}
	}
	
	/**
	 * 检查是否已支付
	 * @param orderId
	 * @return
	 */
	public int isCharged(String orderId) {
		return payMapper.isCharged(orderId);
	}

}
