package com.jupai.weixin.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import com.jupai.comm.Runtimeconfig;

/**
 * 微信接口地址类
 * @author ChenJs
 * @date 2016-3-10 下午12:30:57
 */
public class WeChatUrl {
	
	/**
	 * 获取access_token的接口地址（GET） 限200（次/天）  
	 * @return
	 */
	protected static String token() {
		return new StringBuilder("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=").append(Runtimeconfig.WEIXIN_APPID).append("&secret=").append(Runtimeconfig.WEIXIN_APPSECRET).toString();
	}

	/**
	 * 获取jsapi的接口地址
	 * @return
	 */
	protected static String jsApiTicket() {
		return new StringBuilder("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=").append(CommunicateUtil.getAccessToken().getToken()).append("&type=jsapi").toString();
	}

	/**
	 * 创建菜单的接口地址
	 * @return
	 */
	protected static String menuCreate() {
		return new StringBuilder("https://api.weixin.qq.com/cgi-bin/menu/create?access_token=").append(CommunicateUtil.getAccessToken().getToken()).toString();
	}

	protected static String menuCreate(String accessToken) {
		return new StringBuilder("https://api.weixin.qq.com/cgi-bin/menu/create?access_token=").append(accessToken).toString();
	}

	/**
	 * 生成微信二维码的接口地址
	 * @param accessToken
	 * @return
	 */
	protected static String qrcodeCreate() {
		return new StringBuilder("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=").append(CommunicateUtil.getAccessToken().getToken()).toString();
	}

	/**
	 * 显示微信二维码的接口地址
	 * @param ticket
	 * @return
	 */
	public static String qrcodeShow(String ticket) {
		return new StringBuilder("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=").append(ticket).toString();
	}

	/**
	 * 根据媒体id获取文件的接口地址
	 */
	public static String mediaGet(String mediaId) {
		return new StringBuilder("http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=").append(CommunicateUtil.getAccessToken().getToken()).append("&media_id=").append(mediaId).toString();
	}

	/**
	 * 发送模板消息接口地址
	 */
	protected static String msgTemplateSend() {
		return new StringBuilder("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=").append(CommunicateUtil.getAccessToken().getToken()).toString();
	}

	// ================================================
	// 下面是 网页授权流程 ，分为4步
	// ================================================
	public static final String SNSAPI_BASE = "snsapi_base";
	public static final String SNSAPI_USERINFO = "snsapi_userinfo";

	/**
	 * 第一步：用户同意授权，获取code（跳转到微信获取授权 code）
	 * <p> 这是一个让用户在微信客户端访问的链接，用户访问后
	 * <p> 1. 先跳转到微信获取授权 code
	 * <p> 2. 然后微信再将code做为参数，重定向到redirectUrl指定的路径
	 * <p> 微信官方说明：
	 * <p> 使用微信Oauth2.0授权重定向到指定url（可获取openid）
	 * <p> 如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE。
	 * <p> 若用户禁止授权，则重定向后不会带上code参数，仅会带上state参数redirect_uri?state=STATE 
	 * <p> code说明 ：code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
	 * @param redirectUrl 	用户确认授权后跳转的地址（内部已使用urlencode对链接进行处理）
	 * @param scope 		应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息） 
	 * @param state	 		重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节 
	 * @return 
	 */
	public static String oAuthRedirectToUrlForCode(String redirectUrl, String scope, String state) {
		try {
			return new StringBuilder("https://open.weixin.qq.com/connect/oauth2/authorize?appid=").append(Runtimeconfig.WEIXIN_APPID).append("&redirect_uri=").append(URLEncoder.encode(redirectUrl, "utf-8")).append("&response_type=code&scope=").append(scope).append("&state=").append(state).append("#wechat_redirect").toString();
		} catch (UnsupportedEncodingException e) {
			return new StringBuilder("https://open.weixin.qq.com/connect/oauth2/authorize?appid=").append(Runtimeconfig.WEIXIN_APPID).append("&redirect_uri=").append(redirectUrl).append("&response_type=code&scope=").append(scope).append("&state=").append(state).append("#wechat_redirect").toString();
		}
	}

	/**
	 * 第一步：用户同意授权，获取code（scope为snsapi_base）
	 * <p> 使用微信Oauth2.0授权重定向到指定url（可获取openid）
	 * <p> 如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE。
	 * <p> 若用户禁止授权，则重定向后不会带上code参数，仅会带上state参数redirect_uri?state=STATE 
	 * <p> code说明 ：code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
	 * @param redirectUrl 	授权后重定向的回调链接地址（内部已使用urlencode对链接进行处理） 
	 * @param state	 		重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节 
	 * @return 
	 */
	public static String oAuthRedirectToUrlForCode(String redirectUrl, String state) {
		try {
			return new StringBuilder("https://open.weixin.qq.com/connect/oauth2/authorize?appid=").append(Runtimeconfig.WEIXIN_APPID).append("&redirect_uri=").append(URLEncoder.encode(redirectUrl, "utf-8")).append("&response_type=code&scope=snsapi_base&state=").append(state).append("#wechat_redirect").toString();
		} catch (UnsupportedEncodingException e) {
			return new StringBuilder("https://open.weixin.qq.com/connect/oauth2/authorize?appid=").append(Runtimeconfig.WEIXIN_APPID).append("&redirect_uri=").append(redirectUrl).append("&response_type=code&scope=snsapi_base&state=").append(state).append("#wechat_redirect").toString();
		}
	}

	/**
	 * 第二步：通过code换取网页授权access_token（作用域为snsapi_base时，同时也获取到openid）
	 * <p> 注意：这里的access_token与基础支持中的access_token（该access_token用于调用其他接口）不同
	 * <p> 如果网页授权的作用域为snsapi_base，则本步骤中获取到网页授权access_token的同时，也获取到了openid
	 * <p> 返回值：
	 * 		{
			   "access_token":"ACCESS_TOKEN", 	网页授权接口调用凭证
			   "expires_in":7200,				access_token接口调用凭证超时时间，单位（秒） 
			   "refresh_token":"REFRESH_TOKEN",	 用户刷新access_token 
			   "openid":"OPENID",				用户唯一标识
			   "scope":"SCOPE",					用户授权的作用域，使用逗号（,）分隔 
			   "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段
			}
	 * @param code 第一步获取的code参数 
	 * @return
	 */
	protected static String oAuthAccessToken(String code) {
		return new StringBuilder("https://api.weixin.qq.com/sns/oauth2/access_token?appid=").append(Runtimeconfig.WEIXIN_APPID).append("&secret=").append(Runtimeconfig.WEIXIN_APPSECRET).append("&code=").append(code).append("&grant_type=authorization_code").toString();
	}

	/**
	 * 第三步：刷新access_token（如果需要）
	 * <p> 由于access_token拥有较短的有效期，当access_token超时后，可以使用refresh_token进行刷新，refresh_token拥有较长的有效期（7天、30天、60天、90天），当refresh_token失效的后，需要用户重新授权。 
	 * <p> 返回值：
	 *	 	{
			   "access_token":"ACCESS_TOKEN",	网页授权接口调用凭证
			   "expires_in":7200,				access_token接口调用凭证超时时间，单位（秒） 
			   "refresh_token":"REFRESH_TOKEN",	用户刷新access_token 
			   "openid":"OPENID",				用户唯一标识
			   "scope":"SCOPE"					用户授权的作用域，使用逗号（,）分隔 
			}
	 * @param refreshToken 填写通过上一步access_token获取到的refresh_token参数 
	 * @return
	 */
	protected static String oAuthRefreshToken(String refreshToken) {
		return new StringBuilder("https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=").append(Runtimeconfig.WEIXIN_APPID).append("&grant_type=refresh_token&refresh_token=").append(refreshToken).toString();
	}

	/**
	 * 第四步：拉取用户信息(需scope为 snsapi_userinfo)
	 * <p> 如果网页授权作用域为snsapi_userinfo，则此时开发者可以通过access_token和openid拉取用户信息了。 
	 * <p> 返回值：
	 * 		{
			   "openid":" OPENID",
			   "nickname": NICKNAME,
			   "sex":"1",		用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 
			   "province":"PROVINCE"
			   "city":"CITY",
			   "country":"COUNTRY",		 	国家，如中国为CN 
			    "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46", 
				"privilege":[	用户特权信息，json 数组，如微信沃卡用户为（chinaunicom） 
				"PRIVILEGE1"
				"PRIVILEGE2"
			    ],
			    "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
			}
	 * @param code
	 * @return
	 */
	protected static String oAuthUserInfo(String accessToken, String openid) {
		return new StringBuilder("https://api.weixin.qq.com/sns/userinfo?access_token=").append(accessToken).append("&openid=").append(openid).append("&lang=zh_CN").toString();
	}

	/**
	 * 检验授权凭证（access_token）是否有效
	 * @param accessToken
	 * @param openid
	 * @return
	 */
	protected static String oAuthCheckAccessToken(String accessToken, String openid) {
		return new StringBuilder("https://api.weixin.qq.com/sns/auth?access_token=").append(accessToken).append("&openid=").append(openid).toString();
	}

}
