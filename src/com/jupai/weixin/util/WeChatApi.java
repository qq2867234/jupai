package com.jupai.weixin.util;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.jupai.weixin.domain.Menu;

/**
 * 微信接口调用类
 * @author ChenJs
 * @date 2015-9-24 下午1:02:01
 */
public class WeChatApi {
	
	/**
	 * 获取access_token
	 * @return
	 */
	public static JSONObject getAccessToken(){
		return CommunicateUtil.https(WeChatUrl.token(), "GET", null);
	}
	
	/**
	 * 获取jsapi
	 * @return
	 */
	public static JSONObject getJsApiTicket() {
		return CommunicateUtil.https(WeChatUrl.jsApiTicket(), "GET", null);
	}
	
	/**
	 * 创建菜单
	 * @return
	 */
	public static JSONObject createMenu(Menu menu) {
		return CommunicateUtil.https(WeChatUrl.menuCreate(), "POST", JSONObject.toJSONString(menu));
	}
	/**
	 * 创建菜单
	 * @return
	 */
	public static JSONObject createMenu(Menu menu, String accessToken) {
		return CommunicateUtil.https(WeChatUrl.menuCreate(accessToken), "POST", JSONObject.toJSONString(menu));
	}
	
	/**
	 * 生成临时二维码
	 * <p> 有过期时间的，最长可以设置为在二维码生成后的30天（即2592000秒）后过期，但能够生成较多数量
	 * <p> URL: https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN
	 * <p> POST data：{"expire_seconds": 604800, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": 123}}}
	 * <p> 返回值：
	 * 		{
	 * 			"ticket":"gQH47joAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL2taZ2Z3TVRtNzJXV1Brb3ZhYmJJAAIEZ23sUwMEmm3sUw==",
	 * 			"expire_seconds":60,
	 * 			"url":"http:\/\/weixin.qq.com\/q\/kZgfwMTm72WWPkovabbI"
	 * 		}
	 * @param sceneId	32位非0整型（最大值： 2的31次方-1 = 2147483647）
	 * @param expireSeconds	二维码有效时间，以秒为单位。 最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。 
	 * @return
	 */
	public static JSONObject createTempQRCode(Integer sceneId, Integer expireSeconds){
		StringBuilder param = new StringBuilder().append("{\"expire_seconds\": ").append(expireSeconds).append(", \"action_name\": \"QR_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": ").append(sceneId).append("}}}\");");
		JSONObject res = CommunicateUtil.https(WeChatUrl.qrcodeCreate(), "POST", param.toString());
		return res;
	}
	
	/**
	 * 生成永久二维码
	 * <p> 无过期时间，数量较少（目前为最多10万个）
	 * <p> URL: https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN
	 * <p> POST data：{"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": 123}}}
	 * @param sceneId 最大值为100000
	 * @return
	 */
	public static JSONObject createPermanentQRCode(Integer sceneId){
		StringBuilder param = new StringBuilder().append("{\"action_name\": \"QR_LIMIT_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": ").append(sceneId).append("}}}\");");
		JSONObject res = CommunicateUtil.https(WeChatUrl.qrcodeCreate(), "POST", param.toString());
		return res;
	} 
	
	/**
	 * 生成永久二维码
	 * <p> 无过期时间，数量较少（目前为最多10万个）
	 * <p> https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN
	 * <p> POST数据：{"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_str": 123}}}
	 * @param sceneStr 长度限制为1到64
	 * @return
	 */
	public static JSONObject createPermanentQRCode(String sceneStr){
		StringBuilder param = new StringBuilder().append("{\"action_name\": \"QR_LIMIT_SCENE\", \"action_info\": {\"scene\": {\"scene_str\": ").append(sceneStr).append("}}}\");");
		JSONObject res = CommunicateUtil.https(WeChatUrl.qrcodeCreate(), "POST", param.toString());
		return res;
	} 
	
	
	/**
     * 发送模板消息
     * @return {"errcode":0,"errmsg":"ok","msgid":401102349}
     */
    public static JSONObject sendTemplateMessage(Map<String, Object> param){
    	return CommunicateUtil.https(WeChatUrl.msgTemplateSend(), "POST", JSONObject.toJSONString(param));
	}
    
	/**
	 * 用户确认授权后，使用 code 获取 openid
	 * @param code
	 * @return
	 */
	public static String getOpenid(String code) {
		if(code == null) return null;
		return CommunicateUtil.https(WeChatUrl.oAuthAccessToken(code), "GET", null).getString("openid");
	}
	
	public static JSONObject getOAuthAccessToken(String code) {
		if(code == null) return null;
		return CommunicateUtil.https(WeChatUrl.oAuthAccessToken(code), "GET", null);
	}
	
	public static JSONObject getOAuthUserInfo(String openid, String accessToken) {
		return CommunicateUtil.https(WeChatUrl.oAuthUserInfo(accessToken, openid), "GET", null);
	}
	
	/**
	 * 获取用户基本信息
	 * <p> 文档：http://mp.weixin.qq.com/wiki/1/8a5ce6257f1d3b2afb20f83e72b72ce9.html
	 * @param openid
	 * @return 
	 * 	<p> subscribe 	用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。 
	 * 	<p> nickname	用户的昵称 
	 * 	<p> sex			用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 
	 * 	<p> headimgurl	用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。 
	 * 	<p> subscribe_time 用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间 
	 */
	public static JSONObject getUserInfo(String openid) {
		return CommunicateUtil.https(new StringBuilder("https://api.weixin.qq.com/cgi-bin/user/info?access_token=").append(CommunicateUtil.getAccessToken().getToken()).append("&openid=").append(openid).append("&lang=zh_CN").toString(), "GET", null);
	}
	
	
}
