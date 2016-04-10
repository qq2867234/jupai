package com.jupai.order.web;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;

import com.jupai.comm.web.AbstractActionBean;

public class OrderAction extends AbstractActionBean {

	private static final long serialVersionUID = -1892685003589230920L;

	/**
	 * 订单详情
	 * @return
	 */
	public Resolution goToOrderDetailPage() {
		return new ForwardResolution("/WEB-INF/order/orderDetail.jsp");
	}
	
	/**
	 * 订单列表
	 * @return
	 */
	public Resolution goToOrderListPage() {
		return new ForwardResolution("/WEB-INF/order/orderList.jsp");
	}

}
