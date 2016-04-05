package com.jupai.pay.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.jupai.comm.Runtimeconfig;
import com.jupai.weixin.web.WeixinActionBean;
import com.pingplusplus.Pingpp;
import com.pingplusplus.exception.PingppException;
import com.pingplusplus.model.Charge;

public class ChargeFactory {
	
	private static Logger log = Logger.getLogger(WeixinActionBean.class);
	
	/** pingpp 管理平台对应的API key */
	public final static String apiKey = Runtimeconfig.PINGPP_APIKEY;
	/** pingpp 管理平台对应的应用ID */
	public final static String appId = Runtimeconfig.PINGPP_APPID;
	public final static Map<String, String> app;
	static {
		app = new HashMap<String, String>();
		app.put("id", appId);
	}

	/**
	 * 创建Charge对象
	 * @param amount	订单总金额（单位：分）
	 * @param subject	商品的标题（最长为 32 个 Unicode 字符）
	 * @param body		商品的描述信息（最长为 128 个 Unicode 字符）
	 * @param orderNo	商户订单号（推荐使用 8-20 位，要求数字或字母）
	 * @param channel	支付使用的第三方支付渠道
	 * @param clientIp	发起支付请求终端的 ip 地址，格式为 IPV4 整型
	 * @return
	 */
	public static Charge create(int amount, String subject, String body, String orderNo, String channel, String clientIp) {
		return create(amount, subject, body, orderNo, channel, clientIp, null, null, null, null);
	}
	
	/**
	 * 创建Charge对象
	 * @param amount	订单总金额（单位：分）
	 * @param subject	商品的标题（最长为 32 个 Unicode 字符）
	 * @param body		商品的描述信息（最长为 128 个 Unicode 字符）
	 * @param orderNo	商户订单号（推荐使用 8-20 位，要求数字或字母）
	 * @param channel	支付使用的第三方支付渠道
	 * @param clientIp	发起支付请求终端的 ip 地址，格式为 IPV4 整型
	 * @return
	 */
	public static Charge create(int amount, String subject, String body, String orderNo, String channel, String clientIp, Map<String, String> extra) {
		return create(amount, subject, body, orderNo, channel, clientIp, extra, null, null, null);
	}
	
	/**
	 * 创建Charge对象
	 * <p> Ping++文档：https://www.pingxx.com/document/api#api-c-new
	 * <p> 有关channel的详细信息，参考文档：https://www.pingxx.com/guidance/config
	  pc
//		alipay_pc_direct: 	支付宝 PC 网页支付
//		upacp_pc			银联 PC 网页支付
		-alipay_qr			支付宝扫码支付（alipay_qr 只需要在服务器端发起交易请求，发起扫码支付请求后，会在支付凭据（Charge 对象）中的 credential 字段里返回一个二维码链接。你需要提取该链接生成二维码，使用手机扫描即可付款。）
		-wx_pub_qr			微信公众账号扫码支付（需要开通微信公众账号支付。wx_pub_qr 只需要在服务器端发起交易请求，发起扫码支付的请求后，会在获取到的支付凭据（Charge 对象）中的 credential 字段里返回一个二维码链接，接入者需要提取该链接生成二维码，使用手机扫描即可付款。发起交易请求需要额外的参数 product_id，该参数是商品 ID）
 	  wap
//		alipay_wap: 		支付宝手机网页支付
//		upacp_wap			银联全渠道手机网页支付（限 2015 年元旦后的银联新商户使用，需要开通银联全渠道手机网页支付。付款完成后客户端跳转到 result_url，渠道会以 POST 方式发送订单信息给 result_url，其中 orderId 对应 Charge 对象里的 order_no。）
//		upmp_wap			银联手机网页支付（限 2015 年元旦之前的银联老客户使用，需要开通银联手机网页支付服务。付款完成后客户端跳转到 result_url，渠道会以 POST 方式发送订单信息给 result_url，其中 orderId 对应 Charge 对象里的 order_no。）
	    微信内置浏览器
//		wx_pub				微信公众账号支付（只能用于微信内置浏览器内，只有服务号才能申请该支付功能）

	 * @param amount	订单总金额（单位：分）
	 * @param subject	商品的标题（最长为 32 个 Unicode 字符）
	 * @param body		商品的描述信息（最长为 128 个 Unicode 字符）
	 * @param orderNo	商户订单号（推荐使用 8-20 位，要求数字或字母）
	 * @param channel	支付使用的第三方支付渠道
	 * @param clientIp	发起支付请求终端的 ip 地址，格式为 IPV4 整型
	 * @param extra		特定渠道发起交易时需要的额外参数以及部分渠道支付成功返回的额外参数。
	 * @param time_expire 订单失效时间，用 Unix 时间戳表示（默认为 1 天）
	 * @param metadata	参考 Metadata 元数据。
	 * @param description	订单附加说明，最多 255 个 Unicode 字符
	 * @return
	 */
	public static Charge create(int amount, String subject, String body, String orderNo, String channel, String clientIp, 
			Map<String, String> extra, Long timeExpire, Map<String, String> metadata, String description)  {
		Pingpp.apiKey = apiKey;
		Charge charge = null;
		Map<String, Object> chargeMap = new HashMap<String, Object>();
		chargeMap.put("amount", amount);
		chargeMap.put("currency", "cny");
		chargeMap.put("subject", subject);
		chargeMap.put("body", body);
		chargeMap.put("order_no", orderNo);
		chargeMap.put("channel", channel);
		chargeMap.put("client_ip", clientIp);
		chargeMap.put("app", app);
		if(extra != null)
			chargeMap.put("extra", extra);
		if(timeExpire != null)
			chargeMap.put("time_expire", timeExpire);
		if(metadata != null)
			chargeMap.put("metadata", metadata);
		if(description != null)
			chargeMap.put("description", description);
		try {
			//发起交易请求
			charge = Charge.create(chargeMap);
			System.out.println(charge);
		} catch (PingppException e) {
			log.error("Charge.create error. ", e);
		}
		return charge;
	}

}
