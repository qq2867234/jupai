package com.jupai.pay.web;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.util.StreamUtils;

import com.alibaba.fastjson.JSONObject;
import com.jupai.comm.Runtimeconfig;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.order.domain.Order;
import com.jupai.order.service.OrderService;
import com.jupai.pay.service.PayService;
import com.jupai.pay.util.ChargeFactory;
import com.jupai.pay.util.WebHooksVerify;
import com.jupai.util.CSRFTokenManager;
import com.jupai.util.IdGenerator;
import com.jupai.util.InputValidator;
import com.jupai.weixin.util.WeChatUrl;
import com.pingplusplus.model.Charge;

public class PayActionBean extends AbstractActionBean {

	private static final long serialVersionUID = -7771541860981173628L;
	
	private Logger logger = Logger.getLogger(PayActionBean.class);
	
	/** 支付渠道 */
	private String channel;
	
	/** 回调接口 */
	/** 支付成功的回调地址 */
	private final String successUrl = " http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPaySuccessPage";
	/** 支付取消的回调地址 */
	private final String cancelUrl = "http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPayCancelPage";
	
	/** 回调接口时传的参数 */
	/** 支付结果 */
	private String result;
	/** 商户订单号 */
	private String out_trade_no;
	
	private String code;
	private String state;
	private String openid;
	
	/** 支付订单号 */
	public String orderId;
	
	private Integer roomId;
	private String checkInDay;
	private String checkOutDay;
	private String name;
	private String mobile;
	private String idNumber;
	
	/** 用来防止CSRF攻击的token */
	private String csrfToken;
	
	@SpringBean
	private PayService payService;
	@SpringBean
	private OrderService orderService; 
	
	/**
	 * 创建支付对象Charge
	 * @param amount 支付金额（单位：分
	 * @param channel 支付渠道
	 * @return
	 */
	public Resolution createCharge() {
		JSONObject json = new JSONObject();
		if(!CSRFTokenManager.checkCSRFToken(getContext().getRequest().getSession(), csrfToken)) {
			json.put("status", "-1");
			json.put("info", "无权限进行此操作！如果是本人操作请刷新页面后重试");
			logger.error("csrftoken check wrong!");
			return jsonStreamingResolution(json);
		}
		if(roomId == null) {
			json.put("status", "-1");
			json.put("info", "无法获取房源信息，请重试");
			return jsonStreamingResolution(json);
		}
		if(checkInDay == null || checkOutDay == null) {
			json.put("status", "-1");
			json.put("info", "请选择入住与离店日期");
			return jsonStreamingResolution(json);
		}
		if(name == null) {
			json.put("status", "-1");
			json.put("info", "请填写联系人姓名");
			return jsonStreamingResolution(json);
		}
		if(mobile == null) {
			json.put("status", "-1");
			json.put("info", "请填写手机号");
			return jsonStreamingResolution(json);
		}
		if(!InputValidator.virMobile(mobile)) {
			json.put("status", "-1");
			json.put("info", "请填写有效的手机号");
			return jsonStreamingResolution(json);
		}
		if(idNumber == null) {
			json.put("status", "-1");
			json.put("info", "请填写身份证号");
			return jsonStreamingResolution(json);
		}
		if(!InputValidator.virIdNumber(idNumber)) {
			json.put("status", "-1");
			json.put("info", "请填写有效的身份证号");
			return jsonStreamingResolution(json);
		}
		if(channel == null) {
			json.put("status", "-1");
			json.put("info", "请选择支付方式");
			return jsonStreamingResolution(json);
		}
		String openid = getCurrentOpenid();
		if(openid == null) {
			json.put("status", "-1");
			json.put("info", "请求超时，请返回重试");
			return jsonStreamingResolution(json);
		}
		try {
			// 判断是否可租
			if(!orderService.isCanRent(roomId, checkInDay, checkOutDay)) {
				json.put("status", "-1");
				json.put("info", "行程内已有房间被预定完");
				return jsonStreamingResolution(json);
			}
			// 获取订单定额(根据入住日期计算)
			Integer amount = orderService.getOrderAmount(roomId, checkInDay, checkOutDay);
			
			Map<String, String> extra = null;
			switch (channel) {
				case "alipay_wap": // 支付宝手机网页支付（支付完成将额外返回付款用户的支付宝账号 buyer_account）
					extra = new HashMap<String, String>();
					extra.put("success_url", successUrl); 
					extra.put("cancel_url", cancelUrl);
					break;
				case "wx_pub": // 微信公众账号支付（只能用于微信内置浏览器内）
					extra = new HashMap<String, String>();
					extra.put("open_id", openid);
					break;
				default:
					json.put("status", "-1");
					json.put("info", "无效的支付方式");
					return jsonStreamingResolution(json);
			}
			// 生成订单号
			String orderId = IdGenerator.getOrderId();
			// 创建charge对象
			Charge charge = ChargeFactory.create(amount * 100, "居派住宿费用", "贴心的服务，放心的选择", orderId, channel, "127.0.0.1", extra);
			
			// 创建订单(目前默认是支付服务费，之后有添加新的支付类型，再通过参数来获取支付类型)
			Order order = new Order();
			order.setId(orderId);
			order.setOpenid(openid);
			order.setRoomId(roomId);
			order.setName(name);
			order.setMobile(mobile);
			order.setIdNumber(idNumber);
			order.setCheckInDay(checkInDay);
			order.setCheckOutDay(checkOutDay);
			order.setAmount(amount);
			order.setChannel(channel);
			order.setChargeId(charge.getId());
			int affectedRows = orderService.createOrder(order);
			if(affectedRows > 0) {
				json.put("status", "1");
				json.put("charge", charge);
			} else {
				json.put("status", "-1");
				json.put("info", "创建订单失败，请重试");
			}
			
		} catch (Exception e) {
			logger.error("createCharge error.", e);
			json.put("status", "-1");
			json.put("info", "服务器异常，请稍后再试");
		}
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 支付成功页面
	 * @return
	 */
	public Resolution goToPaySuccessPage() {
		setAttributeInRequest("title", "支付结果");
		setAttributeInRequest("info", "支付成功");
		setAttributeInRequest("desc", "在我的订单可以查看入住指南");
		setAttributeInRequest("btn1", "我的订单");
		setAttributeInRequest("url1", WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Order.action?goToOrderListPage", "")); 
		setAttributeInRequest("num", 1);
		setAttributeInRequest("status", "y");
		return new ForwardResolution("/WEB-INF/weixin/result.jsp");
	}
	
	/**
	 * 支付取消页面-WAP
	 * @return
	 */
	public Resolution goToPayCancelPage() {
		setAttributeInRequest("title", "支付结果");
		setAttributeInRequest("info", "取消成功");
		setAttributeInRequest("btn1", "我的订单");
		setAttributeInRequest("url1", WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Order.action?goToOrderListPage", "")); 
		setAttributeInRequest("num", 1);
		setAttributeInRequest("status", "y");
		return new ForwardResolution("/WEB-INF/weixin/result.jsp");
	}
	
	/**
	 * 接收特定事件的处理结果（支付结果、退款结果等...）
	 * <p> 你的服务器必须以 Ping++ 的 Webhooks 通知的结果作为交易结果，不可用客户端获得的结果作为支付成功与否的判断条件。
	 * <p> 如果没有收到 Webhooks 通知，可以调用 Ping++ 查询方法发起交易查询，该查询结果可以作为交易结果。
	 * 
	 * <p> Webhooks 通知是以 POST 形式发送的 JSON ，放在请求的 body 里，内容是 Event 对象。接收到 Webhooks 后需要返回服务器状态码 200 表示接收成功，否则请返回状态码 500。
	 * <p> Ping++ 的 Webhooks 通知包含了签名字段，可以使用该签名验证 Webhooks 通知的合法性。
	 * <p> 签名放置在 header 的自定义字段 x-pingplusplus-signature 中。签名用 RSA 私钥对 Webhooks 通知使用 RSA-SHA256 算法进行签名，以 base64 格式输出。
	 * <p> 验证签名需要以下两步：
	 * <p> 1. 从 header 取出签名字段并对其进行 base64 解码。
	 * <p> 2. 把 Webhooks 通知、Ping++ 管理平台提供的 RSA 公钥、 和 base64 解码后的签名三者一同放入 RSA 的签名函数中进行非对称的签名运算，来判断签名是否验证通过。
	 * @return 成功-返回2xx 失败-返回500
	 * <p> 若返回状态码不是 2xx，Ping++ 服务器会在 25 小时内向你的服务器进行多次重发，最多 8 次，时间规则跟异步通知相同。
	 */
	public Resolution webhooks() {
		try {
			if(!"POST".equals(getContext().getRequest().getMethod()))
				return status500(getContext().getResponse());
			// 从 header 取出签名字段
			String signature = getContext().getRequest().getHeader("x-pingplusplus-signature");
			if(signature == null) 
				return status500(getContext().getResponse());
			// 获得 http body 内容
			String body = StreamUtils.copyToString(getContext().getRequest().getInputStream(), Charset.forName("UTF-8"));
			// 验证签名
			if(!WebHooksVerify.verify(body.getBytes("UTF-8"), Base64.decodeBase64(signature.getBytes("UTF-8"))))
				return status500(getContext().getResponse());
			// 解析异步通知数据
			JSONObject event = JSONObject.parseObject(body);
	        JSONObject object = event.getJSONObject("data").getJSONObject("object");
	        boolean updatePayStatusSuccess;
			switch (event.getString("type")) {
				case "charge.succeeded": // 支付成功
					updatePayStatusSuccess = payService.chargeSucceeded(object.getString("order_no"));
					CSRFTokenManager.clearCSRFToken(getContext().getRequest().getSession());
					break;
				case "refund.succeeded": // 退款成功
					updatePayStatusSuccess = payService.refundSucceeded(object.getString("charge"));
					CSRFTokenManager.clearCSRFToken(getContext().getRequest().getSession());
					break;
				default:
					return status500(getContext().getResponse());
			}
			if(!updatePayStatusSuccess) return status500(getContext().getResponse());
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return status500(getContext().getResponse());
		}
	}
	
	/**
	 * 检查是否已支付
	 * @return
	 */
	public Resolution isCharged() {
		JSONObject json = new JSONObject();
		if(!StringUtils.isBlank(orderId)) {
			int isCharged = payService.isCharged(orderId);
			json.put("status", isCharged);
		} else {
			json.put("status", "e");
		}
		return jsonStreamingResolution(json);
	}
	
	public void setChannel(String channel) {
		this.channel = channel;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setState(String state) {
		this.state = state;
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

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public void setCsrfToken(String csrfToken) {
		this.csrfToken = csrfToken;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

}
