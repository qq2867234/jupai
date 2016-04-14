package com.jupai.pay.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jupai.pay.domain.Pay;
import com.jupai.pay.persistence.PayMapper;

@Service("PayService")
public class PayService {
	
	private Logger log = Logger.getLogger(PayService.class);
	
	@Autowired
	private PayMapper payMapper;
	
	/**
	 * 更新支付状态
	 * @param orderNo
	 * @param status
	 * @return
	 */
	@Transactional
	public boolean payCallback(String orderNo, Byte status) {
		try {
			// 更新支付状态
			int affectedRows = payMapper.updatePayStatus(orderNo, status);
			if (affectedRows == 1) {
				log.info("updatePayStatus success: " + orderNo);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderNo=" + orderNo);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderNo="+orderNo, e);
			return false;
		}
	}
	
	/**
	 * 支付成功
	 */
	public boolean chargeSucceeded(String orderNo) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatus(orderNo, Pay.Status.PAY_SUCCESS.value());
			if (affectedRows == 1) {
				log.info("chargeSucceeded: "+orderNo);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderNo="+orderNo);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderNo="+orderNo, e);
			return false;
		}
	}
	
	/**
	 * 支付失败
	 */
	public boolean chargeFailed(String orderNo) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatus(orderNo, Pay.Status.PAY_FAIL.value());
			if (affectedRows == 1) {
				log.info("chargeSucceeded: "+orderNo);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderNo="+orderNo);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderNo="+orderNo, e);
			return false;
		}
	}
	
	/**
	 * 退款成功
	 */
	public boolean refundSucceeded(String orderNo) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatus(orderNo, Pay.Status.REFUND_SUCCESS.value());
			if (affectedRows == 1) {
				log.info("refundSucceeded: "+orderNo);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderNo="+orderNo);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderNo="+orderNo, e);
			return false;
		}
	}


	/**
	 * 退款失败
	 */
	public boolean refundFailed(String orderNo) {
		int affectedRows;
		try {
			// 更新订单状态
			affectedRows = payMapper.updatePayStatus(orderNo, Pay.Status.REFUND_FAIL.value());
			if (affectedRows == 1) {
				log.info("refundFailed: "+orderNo);
				return true;
			} else {
				log.error("updatePayStatus affected rows is zero. orderNo="+orderNo);
				return false;
			}
		} catch (Exception e) {
			log.error("updatePayStatus fail. orderNo="+orderNo, e);
			return false;
		}
	}


	/**
	 * 获得已有订单号
	 * @param pid
	 * @param zid
	 * @param channel 
	 * @param status 
	 * @param orderTimeExpire 
	 * @return
	 */
	public String getChargeId(Integer uid, String channel, byte status, Integer orderTimeExpire) {
		return payMapper.getChargeId(uid, channel, status, orderTimeExpire);
	}
	
	/**
	 * 检查是否已支付
	 * @param orderNo
	 * @return
	 */
	public int isCharged(String orderNo) {
		return payMapper.isCharged(orderNo);
	}

}
