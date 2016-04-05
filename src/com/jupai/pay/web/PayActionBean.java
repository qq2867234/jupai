package com.jupai.pay.web;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.RedirectResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;
import net.sourceforge.stripes.validation.ValidationErrors;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.springframework.util.StreamUtils;

import com.alibaba.fastjson.JSONObject;
import com.jupai.account.service.UserCenterOperatorService;
import com.jupai.comm.Runtimeconfig;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.pay.domain.Pay;
import com.jupai.pay.service.PayService;
import com.jupai.pay.util.ChargeFactory;
import com.jupai.pay.util.WebHooksVerify;
import com.jupai.util.IdGenerator;
import com.jupai.util.UserTrackUtil;
import com.pingplusplus.model.Charge;

public class PayActionBean extends AbstractActionBean {

	private static final long serialVersionUID = -7771541860981173628L;
	
	/** 支付金额（单位：分） */
	private int amount;
	
	/** 支付渠道 */
	private String channel;
	
	/** 回调接口 */
	/** 支付成功的回调地址 */
	private final String successUrlForPCTenant = " http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPaySuccessPageForPCTenant";
	/** 支付成功的回调地址 */
	private final String successUrlForWapTenant = " http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPaySuccessPageForWapTenant";
	/** 支付成功的回调地址 */
	private final String successUrlForPCLandlord = " http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPaySuccessPageForPCLandlord";
	/** 支付成功的回调地址 */
	private final String successUrlForWapLandlord = " http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPaySuccessPageForWapLandlord";
	/** 支付取消的回调地址 */
	private final String cancelUrlForPC = "http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPayCancelPageForPC";
	/** 支付取消的回调地址 */
	private final String cancelUrlForWap = "http://"+Runtimeconfig.DOMAIN+"/Pay.action?goToPayCancelPageForWap";
	
	/** 回调接口时传的参数 */
	/** 支付结果 */
	private String result;
	/** 商户订单号 */
	private String out_trade_no;
	
	private String code;
	private String state;
	
	//支付订单号
	public String orderNo;
	
	private PayService payService;
	@SpringBean
	public void injectPayService(PayService payService){
		this.payService = payService;
	}
	private UserCenterOperatorService ucos; 
	@SpringBean("UserCenterOperatorService")
	public void injectUserCenterOperatorService(UserCenterOperatorService ucos) {
		this.ucos = ucos;
	}
	
	/**
	 * 检查是否已支付
	 * @return
	 */
	public Resolution isCharged() {
		if(!checkLoginStatusForLocal()) 
			return new RedirectResolution("/");
		JSONObject json = new JSONObject();
		if(!StringUtils.isBlank(orderNo)) {
			int isCharged = payService.isCharged(orderNo);
			byte role = getCurrRole();
			json.put("role", role);
			json.put("status", isCharged);
		} else {
			json.put("status", "e");
		}
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 支付页面入口
	 * @return
	 */
	public Resolution goToPayPage() {
		if(!checkLoginStatusForLocal()) 
			return new RedirectResolution("/");
		Byte role = getCurrRole();
		Integer pid = (Integer) getAttributeFromSession("pid");
		if(pid == null) {
			setAttributeInRequest("errorMessage", "出现错误，请重新操作");
			return new ForwardResolution("/error.jsp");
		}
		// 设置服务金额
		if(role == 1) {
			amount = Pay.Type.SERVICE_FEE.tenantFee();
//			amount = 1;
			StringBuilder builder = new StringBuilder();
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span></li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span></li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span></li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span></li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span></li>");
			setAttributeInRequest("serviceInfo", builder.toString());
			builder = new StringBuilder();
			builder.append("<p>一次签约收取299元，可以有10次联系房东的机会。</p>");
			builder.append("<p>您可以选择以下支付方式，点击进入支付流程：</p>");
			setAttributeInRequest("priceInfo", builder.toString());
		} else {
			Integer zid = getCurrZid();
//			amount = 1;
			StringBuilder builder = new StringBuilder();
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span>全平台支持</li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span>全平台支持</li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span>全平台支持</li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span>全平台支持</li>");
//			builder.append("<li><span class='zgIcon zgIcon-check-circle'></span>全平台支持</li>");
			setAttributeInRequest("serviceInfo", builder.toString());
			builder = new StringBuilder();
//			builder.append("<p>一次签约收取单月房租*10%舍小数取整到“元”，最低199 元</p>");
//			builder.append("<p>您可以选择以下支付方式，点击进入支付流程：</p>");
			builder.append("<p class='payRemark'>声明：如果租客取消签约，服务费全额退还；如租客签约后您取消签约，则只收取99元服务费，其余金额退还给您。</p>");
			setAttributeInRequest("priceInfo", builder.toString());
			setAttributeInRequest("chance", 1);
		}
		// amount / 100  变为元
		setAttributeInRequest("amount", amount);
		
		byte isPCOrWapOrWechat = UserTrackUtil.isPCOrMobileOrWechat(getContext().getRequest());
		// 手机网页
		if(isPCOrWapOrWechat == 2){
			return new ForwardResolution("/WEB-INF/pay/wapPay.jsp");
		}
		// 微信
		else if (isPCOrWapOrWechat == 3){
			return new ForwardResolution("/WEB-INF/pay/wxpubPay.jsp");
		} 
		// PC
		else {
			return new ForwardResolution("/WEB-INF/pay/pcPay.jsp");
		} 
	}
	
	/**
	 * 前往微信支付页面
	 * @return
	 */
	public Resolution goToWxpubPayPage() {
		setAttributeInRequest("code", code);
		setAttributeInRequest("amount", state);
		return new ForwardResolution("/WEB-INF/pay/wxpubpay2.jsp");
	}
	
	/**
	 * 创建支付对象Charge
	 * @param amount 支付金额（单位：分
	 * @param channel 支付渠道
	 * @return
	 */
	public Resolution createCharge() {
		if(!checkLoginStatusForLocal()) 
			return new RedirectResolution("/");
		Charge charge = null;
		Map<String, String> extra = null;
		JSONObject json = new JSONObject();
		
		Byte role = getCurrRole();
		int zid = getCurrZid();
		Integer pid = (Integer) getAttributeFromSession("pid");
		if(pid == null) {
			setAttributeInRequest("errorMessage", "出现错误，请重新操作");
			return new ForwardResolution("/error.jsp");
		}
		//设置服务金额
		if(role == 1) {
			amount = Pay.Type.SERVICE_FEE.tenantFee();
//			amount = 1;
		} else {
//			amount = 1;
		}
		String orderNo = "";
//		String chargeId = payService.getChargeId(pid, zid, channel, Pay.Status.UN_PAY.value(), Runtimeconfig.ORDER_TIME_EXPIRE);
//		if(!StringUtils.isNotBlank(chargeId)) {
			switch (channel) {
				case "alipay_pc_direct": // 支付宝PC网页支付
					extra = new HashMap<String, String>();
					extra.put("success_url", role == 1 ? successUrlForPCTenant : successUrlForPCLandlord);
					break;
				case "wx_pub_qr": // 微信扫码支付
					extra = new HashMap<String, String>();
					extra.put("product_id", "zhengorservice"); // TODO 商品 ID 需要为收取服务费的商品定义一个id
					break;
				case "alipay_wap": // 支付宝手机网页支付（支付完成将额外返回付款用户的支付宝账号 buyer_account）
					extra = new HashMap<String, String>();
					extra.put("success_url", role == 1 ? successUrlForWapTenant : successUrlForWapLandlord); 
					extra.put("cancel_url", cancelUrlForWap);
					break;
				case "wx_pub": // 微信公众账号支付（只能用于微信内置浏览器内）
					extra = new HashMap<String, String>();
					String openId = ucos.getUserOpenid(zid);
					extra.put("open_id", openId);
					break;
				default:
					return jsonFailureStreamingResolution("无效的支付方式");
			}
			// 生成订单号
			orderNo = IdGenerator.getOrderNo();
			// 创建charge对象
			charge = ChargeFactory.create(amount, "真格服务费", "贴心的服务，放心的选择", orderNo, channel, "127.0.0.1", extra);
			// 创建订单(目前默认是支付服务费，之后有添加新的支付类型，再通过参数来获取支付类型)
			payService.addPay(getCurrZid(), orderNo, Pay.Type.SERVICE_FEE.value(), amount * 100/1.0f, pid, channel, role, charge.getId(), 110000);
			// 测试微信号，跳过支付
			if(UserTrackUtil.isPCOrMobileOrWechat(getContext().getRequest()) == 3 && "wx245e4f08efe9eeca".equals(Runtimeconfig.WEIXIN_APPID)) {
				// 模拟回调
				payService.payCallback(orderNo, Pay.Status.PAY_SUCCESS.value());
				json.put("status", "t");
				return jsonStreamingResolution(json);
			}
//		}
//		else {
//			try {
//				Pingpp.apiKey = ChargeFactory.apiKey;
//				charge = Charge.retrieve(chargeId);
////				charge.setApp(ChargeFactory.app);
//				charge.setChannel(channel);
//			} catch (AuthenticationException | InvalidRequestException | APIConnectionException | APIException
//					| ChannelException e) {
//				e.printStackTrace();
//				json.put("status", "e");
//				json.put("info", "网络异常，请稍后重试");
//				return jsonStreamingResolution(json);
//			}
//		}
		json.put("status", "y");
		json.put("charge", charge);
		return jsonStreamingResolution(json);
	}
	
	/**
	 * 支付成功页面-租客-PC
	 * @return
	 */
	public Resolution goToPaySuccessPageForPCTenant() {
		setAttributeInRequest("info", "支付成功，合同确认信息已推送给房东，请前往『我的签约』进行在线签约。");
		setAttributeInRequest("btn1", "前往我的签约");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("status", "y");
		setAttributeInRequest("num", 1);
		return new ForwardResolution("/WEB-INF/flow/success.jsp");
	}
	
	/**
	 * 支付失败页面-租客-PC
	 * @return
	 */
	public Resolution goToPayFailedPageForPCTenant() {
		setAttributeInRequest("info", "支付失败，请重试或者联系客服，客服电话： 400-115-6080。");
		setAttributeInRequest("btn1", "前往我的签约");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("status", "n");
		setAttributeInRequest("num", 1);
		return new ForwardResolution("/WEB-INF/flow/success.jsp");
	}
	
	/**
	 * 支付失败页面-房东-PC
	 * @return
	 */
	public Resolution goToPayFailedPageForPCLandlord() {
		setAttributeInRequest("info", "支付失败，请重试或者联系客服，客服电话： 400-115-6080。");
		setAttributeInRequest("btn1", "前往我的签约");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("status", "n");
		setAttributeInRequest("num", 1);
		return new ForwardResolution("/WEB-INF/flow/success.jsp");
	}
	
	/**
	 * 支付成功页面-租客-WAP
	 * @return
	 */
	public Resolution goToPaySuccessPageForWapTenant() {
		setAttributeInRequest("info", "支付成功，合同确认信息已推送给房东，请前往『我的签约』进行在线签约。");
		setAttributeInRequest("btn1", "前往我的签约");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("status", "y");
		setAttributeInRequest("num", 1);
		return new ForwardResolution("/WEB-INF/wx/success_wx.jsp");
	}
	/**
	 * 支付成功页面-房东-PC
	 * @return
	 */
	public Resolution goToPaySuccessPageForPCLandlord() {
		setAttributeInRequest("info", "支付成功，合同信息已推送给租客，请等待租客确认。");
		setAttributeInRequest("btn1", "知道了");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("status", "y");
		setAttributeInRequest("num", 1);
		return new ForwardResolution("/WEB-INF/flow/success.jsp");
	}
	/**
	 * 支付成功页面-房东-WAP
	 * @return
	 */
	public Resolution goToPaySuccessPageForWapLandlord() {
		setAttributeInRequest("info", "支付成功，合同信息已推送给租客，请等待租客确认。");
		setAttributeInRequest("btn1", "知道了");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("status", "y");
		setAttributeInRequest("num", 1);
		return new ForwardResolution("/WEB-INF/wx/success_wx.jsp");
	}
	/**
	 * 支付取消页面-PC
	 * @return
	 */
	public Resolution goToPayCancelPageForPC() {
		setAttributeInRequest("status", "y");
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("info", "取消成功");
		setAttributeInRequest("num", 1);
		setAttributeInRequest("btn1", "知道了");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		return new ForwardResolution("/WEB-INF/flow/success.jsp");
	}
	/**
	 * 支付取消页面-WAP
	 * @return
	 */
	public Resolution goToPayCancelPageForWap() {
		setAttributeInRequest("status", "y");
		setAttributeInRequest("title", "在线支付");
		setAttributeInRequest("info", "取消成功");
		setAttributeInRequest("num", 1);
		setAttributeInRequest("btn1", "知道了");
		setAttributeInRequest("url1", "/Sign.action?goToSignListPage"); 
		return new ForwardResolution("/WEB-INF/wx/success_wx.jsp");
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
//	        Event event = Webhooks.eventParse(body);
			JSONObject event = JSONObject.parseObject(body);
	        JSONObject data = event.getJSONObject("data");
	        JSONObject object = data.getJSONObject("object");
	        boolean updatePayStatusSuccess;
			switch (event.getString("type")) {
				case "charge.succeeded": // 支付成功
					updatePayStatusSuccess = payService.payCallback(object.getString("order_no"), Pay.Status.PAY_SUCCESS.value());
					break;
				case "refund.succeeded": // 退款成功
					updatePayStatusSuccess = payService.payCallback(object.getString("order_no"), Pay.Status.REFUND_SUCCESS.value());
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
	
	public void setChannel(String channel) {
		this.channel = channel;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	public void setCode(String code) {
		this.code = code;
	}

	public void setState(String state) {
		this.state = state;
	}
	

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Override
	public Resolution handleValidationErrors(ValidationErrors arg0) throws Exception {
		return null;
	}
	public static void main(String[] args) {
		System.out.println(StringUtils.isNotBlank(null));
	}

}
